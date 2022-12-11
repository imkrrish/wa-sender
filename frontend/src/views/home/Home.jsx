import { Container, Box, Button } from "@mui/material"
import React, { useRef } from "react"
import styles from "./Home.module.css"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import ArticleIcon from "@mui/icons-material/Article"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import CircularProgress from "@mui/material/CircularProgress"
import { green } from "@mui/material/colors"
import xlsxIcon from "../../assests/excel.png"
import { useNavigate } from "react-router-dom"

const Home = ({ setwelcome }) => {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const timer = useRef()
  const navigate = useNavigate()
  setwelcome(false)

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700]
      }
    })
  }

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = window.setTimeout(() => {
        setSuccess(!success)
        setLoading(false)
      }, 2000)
    }
    if (success) {
      navigate("/writemessage")
    }
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
          padding: "2rem 0"
        }}
      >
        <div className={styles.box}>
          <div className={styles.dropfile}>
            <div className={styles.dropfileinputlabel}>
              <CloudUploadIcon sx={{ fontSize: "5rem" }} />
              <p>Drag & Drop your file here, or click to select file</p>
            </div>
            <input className={styles.dropfileinput} type="file" value="" />
          </div>

          <div className={styles.dropfilepreview}>
            <p className={styles.dropfilepreviewtitle}>Ready to upload</p>
            <div className={styles.dropfilepreviewitem}>
              <img
                className={styles.dropfilepreviewitemimg}
                src={xlsxIcon}
                alt=""
              />
              <div className={styles.dropfilepreviewiteminfo}>
                <p className={styles.dropfilepreviewiteminfoP}>
                  only xlsx files
                </p>
                <p>240kb</p>
              </div>
              <span
                className={styles.dropfilepreviewitemdel}
                // onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
            <Box
              sx={{
                m: 1,
                position: "relative",
                width: "fit-content",
                float: "right"
              }}
            >
              <Button
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick}
                startIcon={!success && <ArticleIcon />}
                endIcon={success && <NavigateNextIcon />}
              >
                {success ? "Next" : "Read File"}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px"
                  }}
                />
              )}
            </Box>
          </div>
        </div>
      </Box>
    </Container>
  )
}

export default Home
