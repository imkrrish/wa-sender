import React, { lazy, Suspense, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Lottie from "lottie-react"
import loadingAnimation from "./assests/loading.json"
import { ContextProvider } from "./context"
import AppBar from "./views/appBar/AppBar"
const Welcome = lazy(() => import("./views/welcome/Welcome"))
const Login = lazy(() => import("./views/Login/Login"))
const Home = lazy(() => import("./views/home/Home"))
const WriteMessage = lazy(() => import("./views/writeMessage/WriteMessage"))
const MessageSent = lazy(() => import("./views/messageSent/MessageSent"))

function App() {
  const [welcome, setwelcome] = useState(true)
  return (
    <BrowserRouter>
      <ContextProvider setwelcome={setwelcome}>
        {!welcome && <AppBar />}
        <Suspense
          fallback={
            <Lottie animationData={loadingAnimation} className="loading" />
          }
        >
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/writemessage" element={<WriteMessage />} />
            <Route path="/messagesent" element={<MessageSent />} />
          </Routes>
        </Suspense>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
