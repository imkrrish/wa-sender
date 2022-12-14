import { Container, Box, Grid, Typography } from "@mui/material"
import React, { useContext, useRef, useState } from "react"
import Lottie from "lottie-react"
import loadingAnimation from "../../assests/loading.json"
import styles from "./Login.module.css"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import SettingsIcon from "@mui/icons-material/Settings"
// import ReplayIcon from "@mui/icons-material/Replay"
import QRCodeStyling from "qr-code-styling"
// import HelpyLogo from "../../assests/Helpy-logo.svg"
import { SocketContext } from "../../context"
import { useEffect } from "react"

const qrcode = new QRCodeStyling({
  width: 300,
  height: 300,
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  }
})

const Login = ({ setwelcome }) => {
  const { QR, getStarted } = useContext(SocketContext)
  const [loading, setLoading] = useState(true)
  const QRref = useRef(null)
  setwelcome(false)

  useEffect(() => {
    qrcode.append(QRref.current)
    if (
      window.performance.navigation.type ===
        window.performance.navigation.TYPE_RELOAD &&
      loading
    ) {
      getStarted()
    }
  }, []) /* eslint-disable-line */

  useEffect(() => {
    qrcode.update({ data: QR })
    if (QR) {
      setLoading(false)
    }
  }, [QR])

  return (
    <Container className={styles.container}>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "#e4ebff",
          borderRadius: "20px",
          justifySelf: "center",
          padding: "2rem 0"
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          direction="row"
          height="100%"
          width="100%"
          margin="0"
        >
          <Grid item xs={12} md={8} sx={{ paddingTop: "0px !important" }}>
            <div className={styles.setupcontainer}>
              <Typography variant="h5" className={styles.heading} gutterBottom>
                To set up Helpy on your computer
              </Typography>
              <Typography
                variant="subtitle1"
                className={styles.list}
                gutterBottom
              >
                1. Open WhatApp on your phone
              </Typography>
              <Typography
                variant="subtitle1"
                className={styles.list}
                gutterBottom
              >
                2. Tap Menu <MoreVertIcon />
                or Settings{" "}
                <SettingsIcon
                  sx={{ marginLeft: "5px", marginRight: "5px" }}
                />{" "}
                and select Linked Devices
              </Typography>
              <Typography
                variant="subtitle1"
                className={styles.list}
                gutterBottom
              >
                3. Tap Link a Device and point your phone to this screen to
                capture the code
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ paddingTop: "0px !important" }}
            alignItems="center"
          >
            <Box
              sx={{
                width: 300,
                height: 300,
                backgroundColor: "white",
                borderRadius: "20px",
                justifySelf: "center"
              }}
            >
              {(QRref.current === null || loading) && (
                <Lottie animationData={loadingAnimation} />
              )}
              {/* <div className={styles.reload} onClick={getStarted}>
                  <ReplayIcon />
                  <Typography variant="subtitle1" className={styles.reloadText}>
                    Click to reload QR Code
                  </Typography>
                </div> */}
              {QRref !== null && <div ref={QRref} />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login
