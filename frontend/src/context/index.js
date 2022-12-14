import { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom"

const SocketContext = createContext()

const socket = io.connect("http://localhost:5000")

const ContextProvider = ({ children }) => {
  const [QR, setQR] = useState(null)
  const [excelFile, setExcelFile] = useState(null)
  const [excelData, setExcelData] = useState(null)
  const [message, setMessage] = useState("")
  const [Counter, setCounter] = useState({ failed: 0, skiped: 0, success: 0 })
  const [Contact, setContact] = useState([])
  const navigate = useNavigate()
  const getStarted = () => {
    socket.emit("getStarted")
    navigate("/login")
  }

  const logout = () => {
    socket.emit("logout")
  }

  const readExcelData = async () => {
    await socket.emit("readExcelData", excelData)
    navigate("/writemessage")
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message) {
      await socket.emit("sendMessage", message)
    }
  }

  useEffect(() => {
    socket.on("qr", (qr) => {
      setQR(qr)
    })

    socket.on("authenticated", () => {
      navigate("/home")
    })

    socket.on("sent", () => {
      navigate("/messagesent")
    })

    socket.on("result", ({ counter, ContactsData }) => {
      setCounter(counter)
      setContact(ContactsData)
    })

    socket.on("disconnected", () => {
      navigate("/login")
    })
  }, [navigate])

  return (
    <SocketContext.Provider
      value={{
        getStarted,
        QR,
        socket,
        logout,
        excelFile,
        setExcelFile,
        excelData,
        setExcelData,
        readExcelData,
        setMessage,
        sendMessage,
        Counter,
        Contact
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }

// { id: 1, name: "Snow", number: 7689089538, status: "Sent" },
//     { id: 2, name: "Lannister", number: 2552356442, status: "Sent" },
//     { id: 3, name: "Lannister", number: 4456738215, status: "Sent" },
//     { id: 4, name: "Stark", number: 4456738215, status: "Sent" },
//     { id: 5, name: "Targaryen", number: 2552356442, status: "Failed" },
//     { id: 6, name: "Melisandre", number: 14456738215, status: "Failed" },
//     { id: 7, name: "Clifford", number: 2552356442, status: "Skiped" },
//     { id: 8, name: "Frances", number: 7689089538, status: "Sent" },
//     { id: 9, name: "Roxie", number: 4456738215, status: "Failed" }
