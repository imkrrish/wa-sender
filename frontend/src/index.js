import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import reportWebVitals from "./reportWebVitals"
import Lottie from "lottie-react"
import loadingAnimation from "./assests/loading.json"

const LazyApp = lazy(() => import("./App"))

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Suspense
      fallback={<Lottie animationData={loadingAnimation} className="loading" />}
    >
      <LazyApp />
    </Suspense>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
