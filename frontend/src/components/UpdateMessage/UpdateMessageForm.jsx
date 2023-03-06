import React from 'react'
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import requests from "./../../apis/posts/requests";
const UpdateMessageForm = (props) => {
  const {message } = props;

  const fetchedMessage = message || {};
  console.log(message);
    const [submitted, setSubmitted] = useState(false);
    let navigate = useNavigate();
    const [formvalues, setformValues] = useState({ Message:fetchedMessage.Message|| "" });
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [notification, setNotification] = useState({
        show: false,
        type: "warning",
        text: "",
      });
      const handleFormSubmit = (values) => {
        // e.preventDefault();
        setSubmitted(true);
        // console.log(values);
        setformValues(values);
      };
    
      useEffect(() => {
        const sendPost = async (dataToSend, id) => {
          const results = await requests.updateMessagePost(dataToSend, id);
    
          const { response, data } = results;
          console.log(response, data);
          if (response.ok) {
            if (data) {
              const err = data.message || {};
              if (err) {
                setNotification({
                  show: true,
                  type: "success",
                  text: "Congratulation ,the Message has been updated successfully ",
                });
                goToHome();
              }
            }
          } else if (data) {
            const err = data.message || {};
    
            if (err) {
              setNotification({
                show: true,
                type: "warning",
                text: err,
              });
            }
          } else {
            setNotification({
              show: true,
              type: "error",
              text: "unknownerror",
            });
          }
        };
        try {
          if (submitted) {

            sendPost(formvalues, message._id);
          } else {
            setSubmitted(false);
          }
        } catch (error) {
          console.log(error);
        }
      }, [submitted]);
      let goToHome = () => {
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      };
    
  return (
    <>
        <Stack sx={{ width: "70%" ,margin:"auto" ,marginBottom:"30px" }} spacing={2}>
    {notification.show && (
      <Alert severity={notification.type} variant="filled">
        {notification.text}
      </Alert>
    )}
  </Stack>
  <Formik
    onSubmit={handleFormSubmit}
    initialValues={{Message: fetchedMessage.Message }}
    validationSchema={checkoutSchema}
    enableReinitialize
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
    }) => (
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },

            width: "70%",
            margin: "auto",
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            multiline
            rows={6}
            label=""
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Message}
            name="Message"
            error={!!touched.Message && !!errors.Message}
            helperText={touched.Message && errors.Message}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Button type="submit" color="primary" variant="contained">
            Update Message
          </Button>
        </Box>
      </form>
    )}
  </Formik>
    </>

  )
}
const checkoutSchema = yup.object().shape({
    Message: yup
      .string()
      .min(3)
      .max(1500)
      .matches(/[a-zA-Z\s_\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}]{3,1500}$/ , 'Is not in correct format')
      .required("This Message Field is required"),
  });

export default UpdateMessageForm