import React, { useEffect, useState } from 'react'
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useParams } from 'react-router-dom';
import requests from "./../../apis/users/requests";
import ProfileUpdateForm from "./ProfileUpdateForm"
const useStyles = makeStyles({
    root: {
      maxWidth: "90%",
    },
  
    rootnotsm: {
      margin: "1rem auto",
    },
  
    rootsm: {
      margin: "3rem auto",
      maxWidth: "100%",
    },
  
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    body: {
      textAlign: "center",
    },
    image: {
      maxWidth: "80% !important",
      height: "50% !important",
      margin: "auto",
      border: "1px solid red",
      //    marginTop:'30'
    },
    select: {
      display: "flex",
      justifyContent: "space-around",
    },
  });
const Update = (props) => {
    const { id } = useParams();
    const classes = useStyles(props);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const [user, setUser] = useState(undefined);
    useEffect(() => {
      const fetchUser = async (id) => {
        const res = await requests.getOneUser(id);
        const { user: fetcheduser } = res;
        setUser(fetcheduser);
        console.log(fetcheduser);
      };
      fetchUser(id);
    }, [id]);
  return (
    <Box m="20px">
    <Header title="Update-Profile" subtitle="Update Profile Page" />
    <Paper
      sx={{
        maxWidth: "90%",
        m: "1px auto",
        p: "10px",
        borderRadius: "20px",
        boxShadow: 3,
      }}
    >
         <Grid
          container
          direction={matches ? "column" : "row"}
          className={
            matches
              ? `${classes.root} ${classes.rootsm}`
              : `${classes.root} ${classes.rootnotsm}`
          }
          justifyContent="center"
        >
          {user && <ProfileUpdateForm UserData={user} />}
        </Grid>
        </Paper>
        </Box>
  )
}

export default Update