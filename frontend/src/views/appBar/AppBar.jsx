import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import HelpyLogo from "../../assests/Helpy.svg"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import styles from "./AppBar.module.css"
import { Avatar, Container } from "@mui/material"

export default function MenuAppBar() {
  const auth = true
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Container>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#ffffff00",
          boxShadow: "none",
          marginTop: "2rem"
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", padding: "0 !important" }}
        >
          <img
            src={HelpyLogo}
            className={styles.img}
            alt=""
            sx={{ flexGrow: 1 }}
          />
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar>
                  <AccountCircle fontSize="large"/>
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ top: "8%" }}
              >
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  )
}
