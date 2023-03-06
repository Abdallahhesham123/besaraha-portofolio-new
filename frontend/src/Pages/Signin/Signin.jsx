import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
// import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { makeStyles } from "@mui/styles";

import { Link, useNavigate } from "react-router-dom";


import validate from "./../../Utility/validation/loginvValidation/login";
import requests from "./../../apis/login/requests";
import PasswordInput from "../../Utility/PasswordInput/PasswordInput";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AuthContext } from "./../../context/auth";
const useStyles = makeStyles({
  paperStyle: {
    padding: "15px",
    width: "60%",
    margin: "7% auto",
  },
  notification: {
    margin: " 30px auto",
  },
  submit:{
    position: "relative",
    margin: "50px auto",
    left:" 50%",
    transform: "translate(-50%)"

  }
});
const Signin = (props) => {
  const headerStyle = { margin: 0 };
  const avatarStyle = { 

    width:"100%",
    height:"100%",
    
      };
  const Text ={
    textDecoration:"none"
  }
  const marginBottom = { marginBottom: 10 };
  const marginTOP = { marginTop: 20 };
  const classes = useStyles(props);
  const {SaveUserData} = useContext(AuthContext)
  const [values, setValues] = useState({

    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ValidationStatus, setValidationStatus] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "warning",
    text: "",
  });
  //for Input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    //validation
  
    const email = values.email ? values.email.trim() : values.email;
    const password = values.password ? values.password.trim() : values.password;

    const validationErrors = validate( email, password);
    setErrors(validationErrors);
    let validStatus = Object.values(validationErrors).every((x) => x === "");
    if (validStatus) {
      setValidationStatus(true);
    } else {
      setValidationStatus(false);
    }
  };
  useEffect(() => {
    const sendUser = async (dataToSend) => {
      const results = await requests.addOneUser(dataToSend);

      const { response, data } = results;

      console.log(results);
      if (response.ok) {
    if(data){
      const err = data.message || {};
      if (err) {
        setNotification({
          show: true,
          type: "success",
          text: err,
        });
      }
    }
        localStorage.setItem("token",data.token)
        SaveUserData();
        goToHome();
      }else if (data) {
        const err = data.message || {};
        if (err) {
          setNotification({
            show: true,
            type: "warning",
            text: err,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          
        }
      } else {
        setNotification({
          show: true,
          type: "danger",
          text: "unknownerror",
        });
      }
    }
    try {
      if (submitted) {
        if (ValidationStatus) {
          //for frontend before backend
console.log(values);
          sendUser(values);
          setValidationStatus(false);
        }
        setSubmitted(false);
      }

      // validation-start-frontend

      // validation-end-frontend
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
   
      <Paper className={classes.paperStyle}>
        <Box>
        <Grid container justifyContent="space-between">

<Grid item xs={4} >
<Box
        component="img"
    style={avatarStyle}
        alt="The house from the offer."
        src="assets/images/bg-sign-in-basic.jpeg"
      />
  </Grid>  
  <Grid item xs={7} >
  <Grid align="center">

<h2 style={headerStyle}>Login</h2>
<Typography variant="caption" gutterBottom>
  Please fill this form to create an account !
</Typography>
</Grid>
<Stack sx={{ width: "100%" }} className={classes.notification}>
{notification.show && (
  <Alert severity={notification.type} variant="filled">
    {notification.text}
  </Alert>
)}
</Stack>
<form onSubmit={handleSubmit}>

<TextField
  label="Email"
  placeholder="Enter your email"
  name="email"
  type="email"
  // variant="outlined"
  value={values.email}
  onChange={handleInputChange}
  error={!!errors.email}
  helperText={errors.email && errors.email}
  fullWidth
  style={marginBottom}
/>

<PasswordInput
  label="Password"
  placeholder="Enter your password"
  name="password"
  value={values.password}
  onChange={handleInputChange}
  error={!!errors.password}
  helperText={errors.password && errors.password}
/>


<Button type="submit" variant="contained" color="primary" className={classes.submit} style={marginTOP}>
  Sign in
</Button>
</form>
<Box style={marginTOP}>
<Grid
  container
  justifyContent= "space-around"
  alignItems="center"
>
<Link to="/sendpasswordresetemail">

<Typography variant="body1" component="h3" style={Text}>
      ForgetPassword
      </Typography>
</Link>
<Typography variant="body1" component="p" style={Text}>
    Don't have an account?
      </Typography>
  <Link to="/register">


  <Typography variant="body1" component=""style={Text}>
        REGISTER
      </Typography>
  </Link>

</Grid>

</Box>


    </Grid>
    </Grid>
        </Box>


      </Paper>
    
  );
};

export default Signin;
