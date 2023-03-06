import React, { useEffect, useState } from "react";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link} from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import validate from "./../../Utility/validation/registerValidation/register";
import requests from "./../../apis/register/requests";
import PasswordInput from "../../Utility/PasswordInput/PasswordInput";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// import { borderRadius } from "@mui/system";

const useStyles = makeStyles({
  paperStyle: {
    padding: "30px",
    width: "80%",
    margin: "0 auto",
    border: "1px solid  #1bbd7e",
    backgroundColor:"#eee"
  },
  notification: {
    margin: " 30px auto",
  },
});

const Signup = (props) => {

  const headerStyle = { margin: 0 , fontStyle:"normal"};
  const avatarStyle = { 

width:"100%",
height:"100%",

  };

  const marginBottom = { marginBottom: 20 };
  const Text ={
    textDecoration:"none"
  }
  const marginTOP = { 
    
    
    marginTop: 15 ,
    justifyContent: 'space-around',
    marginBottom: 20,
    
  
  
  };
  const classes = useStyles(props);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_pass: "",
    // role: "user",
  });
  // let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ValidationStatus, setValidationStatus] = useState(false);
  const [check, setcheck] = useState(false);
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
    const username = values.username ? values.username.trim() : values.username;
    const email = values.email ? values.email.trim() : values.email;
    const password = values.password ? values.password.trim() : values.password;
    const confirm_pass = values.confirm_pass
      ? values.confirm_pass.trim()
      : values.confirm_pass;
    const validationErrors = validate(username, email, password, confirm_pass);
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

      console.log(response, data);
      if (response.ok) {
        setNotification({
          show: true,
          type: "success",
          text: "Congratulation ,Please check your Mail to verify",
        });
        // goToLogin();
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
        if (ValidationStatus) {
          //for frontend before backend
console.log(values);
          sendUser(values);
          setValidationStatus(false);
        }
        setSubmitted(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [submitted]);
  const handlecheckChange = (e) => {
    setcheck(!check);
  };
  // let goToLogin = () => {
  //   setTimeout(() => {
  //     navigate("/Signin", { replace: true });
  //   }, 2000);
  // };

  return (
    
      <Paper className={classes.paperStyle}>
        <Box>
        <Grid container justifyContent="space-between">

<Grid item xs={4} >
<Box
        component="img"
    style={avatarStyle}
        alt="The house from the offer."
        src="assets/images/bg-sign-up-cover.jpeg"
      />
  </Grid>  
  <Grid item xs={7} >
    <Box>

    <Grid align="center">
          <h1 style={headerStyle}>Sign Up</h1>
          <Typography variant="caption" gutterBottom >
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
        <form onSubmit={handleSubmit} sx={{width:"70%"}}>
          <TextField
            label="Name"
            type="text"
            placeholder="Enter your name"
            name="username"
            // variant="outlined"
            value={values.username}
            onChange={handleInputChange}
            error={!!errors.username}
            helperText={errors.username && errors.username}
            fullWidth
            style={marginBottom}
          />
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

          <PasswordInput
            label="confirmation password"
            placeholder="Confirm your password"
            name="confirm_pass"
            value={values.confirm_pass}
            onChange={handleInputChange}
            error={!!errors.confirm_pass}
            helperText={errors.confirm_pass && errors.confirm_pass}
          />
          <Grid container style={marginTOP}>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedA"
                    value={check}
                    onChange={handlecheckChange}
                  />
                }
                label="I accept the terms and conditions."
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!check && true}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box style={marginTOP}>
          <Grid container justifyContent="space-around" alignItems="center">


              <Typography variant="body1" component="p" style={Text}>
              Already have an account?
                </Typography>
           
            <Link to="/login">
                <Typography variant="body1" component="h3"style={Text}>
                    Login
                </Typography>
              </Link>
          </Grid>
        </Box>
    </Box>
  </Grid>    
    </Grid>

        </Box>
 

      </Paper>
   
  );
};

export default Signup;
