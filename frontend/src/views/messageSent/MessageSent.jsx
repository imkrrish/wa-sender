import { Box, Container, Chip, Badge, Button } from "@mui/material"
import React, { useState } from "react"
import DoneIcon from "@mui/icons-material/Done"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid"

import styles from "./MessageSent.module.css"
import { SocketContext } from "../../context"
import { useContext } from "react"

const columns = [
  { field: "id", headerName: "ID", width: 90, flex: 1 },
  {
    field: "name",
    headerName: "Name",
    width: 350,
    sortable: true,
    editable: false,
    flex: 1
  },
  {
    field: "number",
    headerName: "Phone",
    width: 210,
    sortable: true,
    editable: false,
    flex: 1
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.row.status}
        color={
          (params.row.status === "Sent" && "success") ||
          (params.row.status === "Failed" && "error") ||
          (params.row.status === "Skiped" && "warning")
        }
        icon={
          (params.row.status === "Sent" && <DoneIcon />) ||
          (params.row.status === "Failed" && <ErrorOutlineIcon />) ||
          (params.row.status === "Skiped" && <PriorityHighIcon />)
        }
      />
    ),

    sortable: true,
    width: 260,
    editable: false
  }
]

const MessageSent = ({ setwelcome }) => {
  const { Counter, Contact } = useContext(SocketContext)
  const [pageSize, setPageSize] = useState(5)
  setwelcome(false)
  console.log(Counter)
  console.log(Contact)

  return (
    <Container className={styles.container}>
      <Box
        sx={{
          width: "100%",
          height: 524,
          backgroundColor: "#e4ebff",
          borderRadius: "20px",
          justifySelf: "center",
          padding: "2rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <DataGrid
          rows={Contact.length > 0 && Contact}
          //   loading={true}
          columns={columns}
          pagination={true}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25, 50]}
          components={{
            Toolbar: () => (
              <GridToolbarContainer
                sx={{ justifyContent: "space-between", marginBottom: "1rem" }}
              >
                <div>
                  <Badge color="error" badgeContent={Counter.total}>
                    <Chip
                      label="Total"
                      color="info"
                      icon={<PlaylistAddCheckIcon />}
                    />
                  </Badge>
                  <Badge
                    color="error"
                    badgeContent={Counter.success}
                    sx={{ marginLeft: "1rem" }}
                  >
                    <Chip label="Sent" color="success" icon={<DoneIcon />} />
                  </Badge>
                  <Badge
                    color="error"
                    badgeContent={Counter.skiped}
                    sx={{ marginLeft: "1rem" }}
                  >
                    <Chip
                      label="Skiped"
                      color="warning"
                      icon={<PriorityHighIcon />}
                    />
                  </Badge>
                  <Badge
                    color="secondary"
                    badgeContent={Counter.failed}
                    sx={{ marginLeft: "1rem" }}
                  >
                    <Chip
                      label="Failed"
                      color="error"
                      icon={<ErrorOutlineIcon />}
                    />
                  </Badge>
                </div>
                <div>
                  <GridToolbarFilterButton
                    variant="contained"
                    sx={{ marginRight: "1rem" }}
                  />
                  <GridToolbarExport variant="contained" />
                </div>
              </GridToolbarContainer>
            )
          }}
          disableSelectionOnClick
          height="500"
          sx={{
            width: "90%",
            boxShadow: 0,
            border: 0,
            borderColor: "none",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main"
            }
          }}
        />

        <Button variant="contained" color="primary">
          Send More
        </Button>
      </Box>
    </Container>
  )
}

export default MessageSent
