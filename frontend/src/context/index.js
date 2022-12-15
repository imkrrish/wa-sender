import { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useLocation, useNavigate } from "react-router-dom"

const SocketContext = createContext()

const socket = io.connect("http://localhost:5000")

const ContextProvider = ({ children, setwelcome }) => {
  const [QR, setQR] = useState(null)
  const [authenticated, setauthenticated] = useState(false)
  const [excelFile, setExcelFile] = useState(null)
  const [excelData, setExcelData] = useState(null)
  const [message, setMessage] = useState("")
  const [Counter, setCounter] = useState({ failed: 0, skiped: 0, success: 0 })
  const [Contact, setContact] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
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

  const Navigate = (link) => {
    navigate(link)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message) {
      await socket.emit("sendMessage", message)
    }
  }

  const sendMore = () => {
    setExcelFile(null)
    setExcelData(null)
    setMessage("")
    setContact([])
    socket.emit("reset")
    navigate("/home")
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setwelcome(true)
    } else {
      setwelcome(false)
    }

    socket.emit("isAuthenticated")

    socket.on("qr", (qr) => {
      setQR(qr)
    })

    socket.on("loading_screen", ({ percent, message }) => {})
    socket.on("authenticated", (isAuthenticated) => {
      setauthenticated(isAuthenticated)
    })

    socket.on("sent", () => {
      navigate("/messagesent")
    })

    socket.on("result", ({ counter, ContactsData }) => {
      setCounter(counter)
      setContact(ContactsData)
    })

    socket.on("disconnected", () => {
      setQR(null)
      setauthenticated(false)
      navigate("/login")
    })
  }, [navigate, location, setwelcome, authenticated])

  return (
    <SocketContext.Provider
      value={{
        authenticated,
        Navigate,
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
        Contact,
        sendMore
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }
