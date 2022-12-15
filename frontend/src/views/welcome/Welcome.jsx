import React from "react"
import Lottie from "lottie-react"
import WelcomeBot from "../../assests/welcome-animation.json"
import styles from "./Welcome.module.css"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { SocketContext } from "../../context"
import { useContext } from "react"
const Welcome = () => {
  const { getStarted } = useContext(SocketContext)
  return (
    <Container maxWidth="sm">
      <Lottie animationData={WelcomeBot} className={styles.bot} />
      <Typography variant="h5" className={styles.heading} gutterBottom>
        Welcome to Helpy
      </Typography>
      <Typography
        variant="subtitle1"
        className={styles.subHeading}
        gutterBottom
      >
        A simple and reliable Whatsapp Bot to send bulk messages
      </Typography>
      <div className={styles.button}>
        <Button
          variant="contained"
          onClick={() => {
            getStarted()
          }}
        >
          Get Started
        </Button>
      </div>
    </Container>
  )
}

export default Welcome
