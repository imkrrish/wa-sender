import React from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import Welcome from "./views/welcome/Welcome"
import AppBar from "./views/appBar/AppBar"
import Login from "./views/Login/Login"
import Home from "./views/home/Home"
import WriteMessage from "./views/writeMessage/WriteMessage"
import MessageSent from "./views/messageSent/MessageSent"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Welcome />} />
      {/* <AppBar /> */}
      <Route
        path="/login"
        element={
          <>
            <AppBar />
            <Login />
          </>
        }
      />
      <Route
        path="/home"
        element={
          <>
            <AppBar />
            <Home />
          </>
        }
      />
      <Route
        path="/writemessage"
        element={
          <>
            <AppBar />
            <WriteMessage />
          </>
        }
      />
      <Route
        path="/messagesent"
        element={
          <>
            <AppBar />
            <MessageSent />
          </>
        }
      />
    </>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
