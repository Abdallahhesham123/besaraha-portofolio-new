import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import UpdateMessageForm from './UpdateMessageForm.jsx';
import { useParams } from 'react-router-dom';
import requests from "./../../apis/posts/requests.js";
const UpdateMessage = () => {
    const{id}= useParams();
    const [message, setmessage] = useState(undefined);
    useEffect(() => {
        const fetchUser = async (id) => {
          const res = await requests.getoneMessage(id);
          const { message } = res;
          setmessage(message);
          // console.log(message);
        };
        fetchUser(id);
      }, [id]);
    

  return (
    <Box m="20px">
    <Header title="Update MESSAGE" subtitle="Update User Message" />
<UpdateMessageForm message = {message}/>
  </Box>
  )
}

export default UpdateMessage