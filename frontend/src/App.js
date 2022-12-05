import React, { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import QRCodeStyling from "qr-code-styling"
import * as XLSX from "xlsx"
// import { BallTriangle } from "react-loader-spinner"
import "./App.css"

const socket = io.connect("http://localhost:5000")

const qrcode = new QRCodeStyling({
  width: 300,
  height: 300,
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  }
})

function App() {
  const [QR, setQR] = useState("")
  const [Result, setResult] = useState({ fails: 0, success: 0, skip: 0 })
  const [QrLoading, setQrLoading] = useState(true)
  const [send, setSend] = useState(true)
  const [isRead, setIsRead] = useState(true)
  const [Message, setMessage] = useState("Hello World")
  const [messagetoSend, setMessagetoSend] = useState()
  const [excelFile, setExcelFile] = useState(null)
  const [excelData, setExcelData] = useState(null)
  // const [messageFiled, setMessageField] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    qrcode.append(ref.current)

    socket.on("message", (message) => {
      switch (message) {
        case "loading":
          setQrLoading(true)
          break
        case "QrReady":
          setQrLoading(false)
          break
        default:
          break
      }
      setMessage(message)
    })

    socket.on("qr", (url) => {
      setQR(url)
    })

    socket.on("result", (result) => {
      setResult(result)
    })
  }, [])

  useEffect(() => {
    qrcode.update({ data: QR })
  }, [QR])

  const handleClick = () => {
    socket.emit("send", messagetoSend)
    setSend(false)
  }

  const handleChange = (e) => {
    setMessagetoSend(e.target.value)
  }

  const handleFile = (e) => {
    let selectedFile = e.target.files[0]
    if (selectedFile) {
      console.log(selectedFile.type)
      console.log("hiii")
      let reader = new FileReader()
      reader.readAsArrayBuffer(selectedFile)
      reader.onload = (e) => {
        setExcelFile(e.target.result)
      }
    } else {
      console.log("plz select your file")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" })
      const worksheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetName]
      const data = XLSX.utils.sheet_to_json(worksheet)
      setExcelData(data)
      setIsRead(false)
    } else {
      setExcelData(null)
    }
  }

  const handleNext = () => {
    if (excelData !== null) {
      socket.emit("readExcelData", excelData)
    }
    console.log(excelData)
  }

  return (
    <>
      <div className="container">
        <div
          className="card text-center w-75 position-absolute top-50 translate-middle-y"
          style={{ backgroundColor: "#B3B3B3" }}
        >
          <div className="card-body">
            {Message !== "Whatsapp is Logged in" &&
              Message !== "readed" &&
              Message !== "Whatsapp is authenticated!" && (
                <div className="row">
                  <div className="col text-start d-flex flex-column justify-content-center">
                    <h4>To set up</h4>
                    <h5>1. Open WhatsApp on your phone</h5>
                    <h5>2. Tap Menu or Settings and select Linked Devices</h5>
                    <h5>
                      3. Tap Link a Device and point your phone to this screen
                      to capture the code
                    </h5>
                  </div>
                  <div className="col d-flex justify-content-center align-items-center">
                    {QrLoading && (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    {Message !== "Whatsapp is Logged in" && <div ref={ref} />}
                  </div>
                </div>
              )}
            {(Message === "Whatsapp is Logged in" ||
              Message === "Whatsapp is authenticated!") && (
              <>
                <form
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  className="d-flex flex-column align-items-center"
                >
                  <div className="input-group w-75">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                      onChange={handleFile}
                      required
                    />
                  </div>
                  {isRead && (
                    <button
                      type="submit"
                      className="btn btn-outline-primary mt-2"
                    >
                      Read
                    </button>
                  )}
                </form>
                {!isRead && (
                  <button className="btn btn-primary mt-2" onClick={handleNext}>
                    Next
                  </button>
                )}
              </>
            )}

            {Message === "readed" && send === true && (
              <div className="d-flex flex-column">
                <div className="mb-3">
                  <label htmlFor="textArea" className="form-label">
                    Type your message
                  </label>
                  <textarea
                    className="form-control"
                    id="textArea"
                    rows="7"
                    onChange={handleChange}
                    placeholder="Type your message..."
                  ></textarea>
                </div>
                <button onClick={handleClick} className="btn btn-primary">
                  Send Message
                </button>
              </div>
            )}

            {send === false && (
              <>
                <div>
                  <span className="btn btn-primary mx-2">
                    Total{" "}
                    <span className="badge text-bg-danger">
                      {excelData.length}
                    </span>
                  </span>
                  <span className="btn btn-primary mx-2">
                    Sent{" "}
                    <span className="badge text-bg-danger">
                      {Result.success}
                    </span>
                  </span>
                  <span className="btn btn-primary mx-2">
                    Faild{" "}
                    <span className="badge text-bg-danger">{Result.fails}</span>
                  </span>
                  <span className="btn btn-primary mx-2">
                    Skip{" "}
                    <span className="badge text-bg-danger">{Result.skip}</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
