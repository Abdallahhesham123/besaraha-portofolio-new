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

const AddPost = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  let navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formvalues, setformValues] = useState({ Message: "" });
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
      const results = await requests.addOnePost(dataToSend, id);

      const { response, data } = results;
      console.log(response, data);
      if (response.ok) {
        if (data) {
          const err = data.message || {};
          if (err) {
            setNotification({
              show: true,
              type: "success",
              text: "Congratulation ,the Message has been successfully Sending",
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
        //for frontend before backend
        sendPost(formvalues, id);
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
    <Box m="20px">
      <Header title="CREATE POST" subtitle="Create a New User Profile" />
      <Stack sx={{ width: "70%" ,margin:"auto" ,marginBottom:"30px" }} spacing={2}>
        {notification.show && (
          <Alert severity={notification.type} variant="filled">
            {notification.text}
          </Alert>
        )}
      </Stack>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                label="Message"
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
              <Button type="submit" color="secondary" variant="contained">
                Create New Message
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  Message: yup
    .string()
    .min(3)
    .max(1500)
    .matches(/[a-zA-Z\s_\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}]{3,1500}$/ , 'Is not in correct format')
    .required("This Message Field is required"),
});
const initialValues = {
  Message: "",
};

export default AddPost;
