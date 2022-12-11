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

const columns = [
  { field: "id", headerName: "ID", width: 90, flex: 1 },
  {
    field: "Name",
    headerName: "Name",
    width: 350,
    sortable: true,
    editable: false,
    flex: 1
  },
  {
    field: "Phone",
    headerName: "Phone",
    width: 210,
    sortable: true,
    editable: false,
    flex: 1
  },
  {
    field: "Status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.row.Status}
        color={
          (params.row.Status === "Sent" && "success") ||
          (params.row.Status === "Failed" && "error") ||
          (params.row.Status === "Skiped" && "warning")
        }
        icon={
          (params.row.Status === "Sent" && <DoneIcon />) ||
          (params.row.Status === "Failed" && <ErrorOutlineIcon />) ||
          (params.row.Status === "Skiped" && <PriorityHighIcon />)
        }
      />
    ),

    sortable: true,
    width: 260,
    editable: false
  }
]

const rows = [
  { id: 1, Name: "Snow", Phone: 7689089538, Status: "Sent" },
  { id: 2, Name: "Lannister", Phone: 2552356442, Status: "Sent" },
  { id: 3, Name: "Lannister", Phone: 4456738215, Status: "Sent" },
  { id: 4, Name: "Stark", Phone: 4456738215, Status: "Sent" },
  { id: 5, Name: "Targaryen", Phone: 2552356442, Status: "Failed" },
  { id: 6, Name: "Melisandre", Phone: 14456738215, Status: "Failed" },
  { id: 7, Name: "Clifford", Phone: 2552356442, Status: "Skiped" },
  { id: 8, Name: "Frances", Phone: 7689089538, Status: "Sent" },
  { id: 9, Name: "Roxie", Phone: 4456738215, Status: "Failed" }
]

const MessageSent = ({ setwelcome }) => {
  const [pageSize, setPageSize] = useState(5)
  setwelcome(false)
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
          rows={rows}
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
                  <Badge color="error" badgeContent="5">
                    <Chip
                      label="Total"
                      color="info"
                      icon={<PlaylistAddCheckIcon />}
                    />
                  </Badge>
                  <Badge
                    color="error"
                    badgeContent="5"
                    sx={{ marginLeft: "1rem" }}
                  >
                    <Chip label="Sent" color="success" icon={<DoneIcon />} />
                  </Badge>
                  <Badge
                    color="error"
                    badgeContent="5"
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
                    badgeContent="5"
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
