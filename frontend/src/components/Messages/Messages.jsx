import { tokens } from "../../theme";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import Dialog from "./../../Utility/Dialog/Dialog.jsx";
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import requests from "./../../apis/users/requests";
import requestDelete from "./../../apis/posts/requests";
const useStyles = makeStyles({
  image: {
    width: "10% !important",
    height: "10% !important",
  },
});
const Messages = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const columns = [{ field: "Message", headerName: "ID" }];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTrigger, setdeleteTrigger] = useState(false);
  const [deleteMessageId, setdeleteMessageId] = useState("");
  const { id } = useParams();
  let navigate = useNavigate();
  const [messages, setmessages] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    type: "warning",
    text: "",
  });
  const deleteuser = () => {
    setDialogOpen(false);
    setdeleteTrigger(true);
  };
  const deleteAnItem = (id) => {
    setdeleteMessageId(id);
    setDialogOpen(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await requests.getOneUser();
      const { user: fetcheduser } = res;
      setmessages(fetcheduser.messages);
      console.log(fetcheduser);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const TrashMessage = async (id) => {
      const res = await requestDelete.deleteMessage(id);
      const { response, data } = res;
      console.log(data);
      if (response.ok) {
        if (data) {
          const err = data.message || {};

          // console.log("abdallah");
          setNotification({
            show: true,
            type: "error",
            text: err,
          });
        }

        goToHome();
      }
    };
    if (deleteTrigger) {
      TrashMessage(deleteMessageId);
    }
  }, [deleteMessageId, deleteTrigger]);
  let goToHome = () => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  };
  return (
    <>
      <Box m="20px">
        <Header title="MESSAGES" subtitle="Own-Message" />
        <Paper
          sx={{
            maxWidth: "90%",
            m: "1px auto",
            p: 2,
            borderRadius: "20px",
            boxShadow: 3,
          }}
        >
          <Box m="20px">
            <Header title="DASHBOARD" subtitle="List of Messages" />
            <Box
              m="40px 0 0 0"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >
              <TableContainer component={Paper}>
                <Stack sx={{ width: "100%", marginBottom: "30px" }} spacing={2}>
                  {notification.show && (
                    <Alert severity={notification.type} variant="filled">
                      {notification.text}
                    </Alert>
                  )}
                </Stack>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                  }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{
                        display: { sm: "block" },
                        padding: "0.5rem",
                        margin: "0.5rem",

                        "&:hover": {
                          backgroundColor: "#f59e0b",
                          boxShadow: "none",
                        },
                        "&:active": {
                          boxShadow: "none",
                          backgroundColor: "red",
                        },
                      }}
                    >
                      <MuiLink
                        component={Link}
                        to="/"
                        variant="button"
                        underline="none"
                        color="inherit"
                      >
                        Home
                      </MuiLink>
                    </Button>
                  </Grid>

   
                </Grid>

                <Table aria-label="simple table" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Id</TableCell>
                      <TableCell align="center">Messages</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {messages.map((message, index) => {
                      return (
                        <TableRow
                          key={message._id}
                          sx={{
                            "&:last-child td , &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            {message.Message}
                          </TableCell>

                          <TableCell align="center" style={{ width: 250 }}>
                            <Grid container>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => deleteAnItem(message?._id)}
                                  sx={{
                                    display: { sm: "block" },
                                    padding: "0.5rem",
                                    marginRight: "0.5rem",

                                    "&:hover": {
                                      backgroundColor: "red",
                                      boxShadow: "none",
                                    },
                                    "&:active": {
                                      boxShadow: "none",
                                      backgroundColor: "red",
                                    },
                                  }}
                                >
                                  DELETE
                                </Button>
                              </Grid>


                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="success"
                                  sx={{
                                    display: { sm: "block" },
                                    padding: "0.5rem",
                                    margin: "0 0.3rem",
                                    color: "#fff !important",
                                    "&:hover": {
                                      backgroundColor: "#f59e0b",
                                      boxShadow: "none",
                                      color: "#fff !important",
                                    },
                                    "&:active": {
                                      boxShadow: "none",
                                      backgroundColor: "red",
                                      color: "#fff !important",
                                    },
                                  }}
                                >
                                  <MuiLink
                                    component={Link}
                                    to={`/update-message/${message?._id}`}
                                    variant="button"
                                    underline="none"
                                    color="inherit"
                                  >
                                    Update-message
                                  </MuiLink>
                                </Button>
                              </Grid>

                            </Grid>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Dialog
                title={`delete an item  by  Admin`}
                text="are you sure you want to delete this Message?"
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                onDialogConfirm={deleteuser}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Messages;
