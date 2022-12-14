import pkg from "whatsapp-web.js"
const { Client, LocalAuth } = pkg
import express from "express"
import bodyParser from "body-parser"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"

const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("🚀 Hii I am Running...")
})

const ContactsData = []
let counter = { total: 0, failed: 0, success: 0, skiped: 0 }

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
  authStrategy: new LocalAuth({ dataPath: "./session" })
})

io.on("connection", (socket) => {
  console.log("conected")

  socket.on("getStarted", () => {
    client.initialize()

    client.on("qr", (qr) => {
      socket.emit("qr", qr)
      console.log("QR RECEIVED", qr)
    })
  })

  client.on("ready", () => {
    socket.emit("ready")
    console.log("ready")
  })

  client.on("authenticated", (session) => {
    socket.emit("authenticated")
    console.log("authenticated", session)
  })

  client.on("auth_failure", function (session) {
    socket.emit("message", "Auth failure, restarting...")
    console.log("failure", session)
  })

  client.on("disconnected", async (reason) => {
    console.log("message", "Whatsapp is disconnected!")
    await client.destroy()
    console.log("message", "Whatsapp is disconnected!")
    client.initialize()
    socket.emit("disconnected")
  })

  socket.on("logout", async () => {
    await client.logout()
  })

  socket.on("readExcelData", (excelData) => {
    for (const contact of excelData) {
      ContactsData.push(contact)
    }
    counter.total = ContactsData.length
  })

  socket.on("sendMessage", async (message) => {
    async function deploy_all(message) {
      for (const contact of ContactsData) {
        if (contact.send) {
          console.log(contact)
          const final_number = await checkNumber(contact.number)
          const isRegistered = await isRegisteredNumber(final_number)
          if (isRegistered) {
            try {
              client.sendMessage(final_number, message)
            } catch (err) {
              console.log(err)
            } finally {
              contact.status = "Sent"
              counter.success++
            }
          } else {
            contact.status = "Failed"
            counter.failed++
          }
        } else {
          contact.status = "Skiped"
          counter.skiped++
        }
      }
      socket.emit("result", { counter, ContactsData })
      socket.emit("sent")
    }
    deploy_all(message)
  })

  client.on("loading_screen", (percent, message) => {
    console.log("LOADING SCREEN", percent, message)
  })
})

const isRegisteredNumber = async (final_number) => {
  let isRegistered = false
  if (!isRegistered)
    try {
      isRegistered = await client.isRegisteredUser(final_number)
    } catch (err) {
      console.log(err)
    } finally {
      return isRegistered
    }
  else {
    return isRegistered
  }
}

const checkNumber = async (number) => {
  const final_number =
    number.length > 10 ? `${number}@c.us` : `91${number}@c.us`
  return final_number
}

server.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`))

// client.getProfilePicUrl()
