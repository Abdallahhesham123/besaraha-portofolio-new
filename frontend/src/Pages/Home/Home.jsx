import React, { useContext, useEffect } from 'react'
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from '@mui/styles';
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import MuiLink from "@mui/material/Link";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import requests from "./../../apis/posts/requests";
import requestsuser from "./../../apis/users/requests";
import { AuthContext } from "./../../context/auth";
import { useState } from 'react';
const useStyles = makeStyles({

  root:{
    // backgroundColor: "gray" ,
     margin: "2px auto" ,
      maxWidth:"100%",
      padding:"0.5rem",

  },
  main:{
    // backgroundColor: "lightblue" ,
    padding:"0.5rem",
    marginLeft:"0.5rem"

  },
  sidebar:{
    // backgroundColor: "yellow" ,
    padding:"0.5rem",

  }
})
const Home = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fonts =  tokens(theme.typography.fontFamily)
  const classes = useStyles(props)
  const {Userdata} = useContext(AuthContext)
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [messages, setmessages] = useState([]);
  const [users, setusers] = useState([]);
  useEffect(() => {
    const FetchPosts = async () => {
      const dataFetch = await requests.getAll();
      const { messages } = dataFetch;
      // console.log(messages);
    setmessages(messages)
    };
    FetchPosts();
    // window.location.reload();
    // console.log("hello world");
  }, []);

  useEffect(() => {
    const FetchUsers = async () => {
      const dataFetch = await requestsuser.getAll();
      const { users } = dataFetch;
   
      setusers(users)
    
    };
    FetchUsers();
    // window.location.reload();
    // console.log("hello world");
  }, []);

  return (
    <>


<Paper sx={{ maxWidth: "90%", m: "10px auto", p: 2 ,borderRadius:"20px", boxShadow: 3}}>

<Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Home" subtitle="Welcome to your home" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 10px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            <MuiLink
                    component={Link}
                    to={`/profile`}
                    variant="button"
                    underline="none"
                    color="inherit"
                  >
                    Profile
                  </MuiLink>
           
          </Button>
        </Box>
      </Box>
      <Grid container className={classes.root}
         justifyContent="space-between"
         direction={matches ? "column" : "row"}
         >

<Grid item  xs={8} className={classes.main}>
{

messages && messages.length > 0 ? (
  messages.slice(-2).reverse().map((message, index) => {
    // console.log(message.Message);
    return (


      <>
         <Grid item  xs={12} className={classes.main} key={index} >
      <Post
                              id={message?.receiverId}
                              title={message?.Message}
                              date={message?.createdAt}
                              imagePost={message?.postPicture}
      
      />
       </Grid>
     </>
    )
  
  
  })

):(
  <>
        <Typography variant="h4" component="h1">
There is no message found
</Typography>
  </>
)}
           


           </Grid>       
            <Grid item xs={3} className={classes.sidebar}>
            {

users && users.length > 0 ? (
  users.map((user, index) => {
    // console.log(user);
    return (


      <>
         <Grid item  xs={12} className={classes.main} key={index}>
         <Sidebar userdata={user} />
       </Grid>
     </>
    )
  
  
  })

):(
  <>
        <Typography variant="h4" component="h1">
There is no user found
</Typography>
  </>
)}
               

            </Grid>
        </Grid>

        </Box>
  



</Paper>

   





    </>

  )
}

export default Home