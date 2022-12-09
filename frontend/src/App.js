import React from "react"
import Welcome from "./views/welcome/Welcome"
import AppBar from "./views/appBar/AppBar"
import Login from "./views/Login/Login"
import Home from "./views/home/Home"
import WriteMessage from "./views/writeMessage/WriteMessage"
import MessageSent from "./views/messageSent/MessageSent"

function App() {
  return (
    <>
      {/* <Welcome /> */}
      <AppBar />
      {/* <Login /> */}
      {/* <Home /> */}
      {/* <WriteMessage /> */}
      <MessageSent />
    </>
  )
}

export default App
