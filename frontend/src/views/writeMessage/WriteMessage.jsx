import { Box, Button, Container, TextField } from "@mui/material"
import React from "react"
import SendIcon from "@mui/icons-material/Send"
import styles from "./WriteMessage.module.css"

const WriteMessage = () => {
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
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            maxRows={11}
            minRows={11}
            sx={{ width: "37rem" }}
            className={styles.textArea}
            //   value={value}
            //   onChange={handleChange}
          />
        </div>
        <div className={styles.button}>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send Message
          </Button>
        </div>
      </Box>
    </Container>
  )
}

export default WriteMessage
