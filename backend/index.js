const { Client, LocalAuth } = require("whatsapp-web.js")
const express = require("express")
const app = express()
const server = require("http").createServer(app)
const cors = require("cors")

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.get("/", (req, res) => {
  res.send("🚀 Server is Running")
})

const ContactsData = []
let counter = { fails: 0, success: 0, skip: 0 }

const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu"
    ]
  },
  authStrategy: new LocalAuth()
})

client.initialize()

io.on("connection", (socket) => {
  socket.emit("message", "loading")

  client.on("qr", (qr) => {
    socket.emit("qr", qr)
    socket.emit("message", "QrReady")
    console.log("QR", qr)
  })

  client.on("ready", () => {
    socket.emit("message", "Whatsapp is Logged in")
  })

  client.on("authenticated", () => {
    socket.emit("message", "Whatsapp is authenticated!")
    console.log("AUTHENTICATED")
  })

  client.on("auth_failure", (session) => {
    socket.emit("message", "Auth failure, restarting...")
  })

  client.on("disconnected", (reason) => {
    socket.emit("message", "Whatsapp is disconnected!")
    client.destroy()
    client.initialize()
  })

  socket.on("readExcelData", (excelData) => {
    for (const data of excelData) {
      ContactsData.push(data)
    }
    socket.emit("message", "readed")
  })

  socket.on("send", async (messagetoSend) => {
    // console.log("messagetoSend: ", messagetoSend)
    async function deploy_all(message) {
      for (const contact of ContactsData) {
        if (contact.Skip === "no") {
          const final_number =
            contact.Phone_Number.length > 10
              ? `${contact.Phone_Number}@c.us`
              : `91${contact.Phone_Number}@c.us`
          const isRegistered = await client.isRegisteredUser(final_number)
          if (isRegistered) {
            const msg = await client.sendMessage(final_number, message)
            socket.emit("result", counter)
            // console.log(`${contact} Sent Message: ${message}`)
            counter.success++
          } else {
            socket.emit("result", counter)
            // console.log(`${contact} Failed`)
            counter.fails++
          }
        } else {
          socket.emit("result", counter)
          counter.skip++
        }
      }
      socket.emit("result", counter)
      console.log(
        `Result: ${counter.success} sent, ${counter.fails} failed, ${counter.skip} skip`
      )
    }

    deploy_all(messagetoSend)
  })

  socket.on("logout", () => {
    client.logout()
    socket.emit("logout")
  })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`))
