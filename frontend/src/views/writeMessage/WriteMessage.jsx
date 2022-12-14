import { Box, Button, Container, TextField } from "@mui/material"
import React, { useContext } from "react"
import SendIcon from "@mui/icons-material/Send"
import styles from "./WriteMessage.module.css"
import { SocketContext } from "../../context"

const WriteMessage = ({ setwelcome }) => {
  const { setMessage, sendMessage } = useContext(SocketContext)
  setwelcome(false)

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <Container className={styles.container}>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "#e4ebff",
          borderRadius: "20px",
          justifySelf: "center",
          padding: "2rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <form>
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Message"
              multiline
              maxRows={11}
              minRows={11}
              sx={{ width: "37rem" }}
              className={styles.textArea}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.button}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
              onClick={sendMessage}
            >
              Send Message
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  )
}

export default WriteMessage
