import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const switchMode = () => {
    // To Toggle
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    //Reset The Show & Hide Password to false, this will rest it and hide it
    handleShowPassword(false);
  };
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => {
    //To Toggle Show & Hide Password
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj 
    const token = res?.tokenId
    try {
      dispatch({type: 'AUTH', data: {result, token}})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };
  const googleFailure = (err) => {
    // window.alert(
    //   console.error("Google Sign In was unsuccessful. Try Again Later")
    // );
    console.log(err)
    console.error("Google Sign-In was unsuccessful. Try Again");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          {/* Google Login Setup */}
          <GoogleLogin
            clientId="1098171342336-qjncautuut11nrvba2etc0dfk2vgd294.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
                startIcon={<Icon/>}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
         
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
