import {Avatar, Button, Container, Grid, Paper,Typography,} from "@material-ui/core";
import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import useStyles from "./styles";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin} from '@react-oauth/google';
import Icon from "./icon";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {signin, signup} from "../../redux/actions/auth"
import { toast } from "react-toastify";



const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles();
  const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const switchMode = () => {
    // To Toggle the sign-in or signup option
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    //Reset Password to false when the user switches from sign-in to signup or vice-versa this will rest it and hide it
    setShowPassword(false);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault() //This is to avoid auto-refreshing as we want to get the input values, the auto-refreshing refreshes it and we loose the values
    
    if(isSignUp){
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  };

  
  const handleChange = (e) => {
    //This handle change is using onChange event but encapsulated with props, checkout the Input component for better view
    setFormData({...formData, [e.target.name]: e.target.value}) // this will spread all of the other properties, but also change the specific one we're filling in the current input fields
    //also make sure the names here are exactly the same as the names of the input fields i.e. name property in input tags
  };


  const handleShowPassword = () => {
    //To Toggle Show & Hide Password
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const googleSuccess = async (res) => {
    let result;
    let token;

    if (res?.credential)  {
      console.log(res)
      result = jwtDecode(res?.credential)
      console.log(result)
      const {sub, name, email, picture} = result
      result = {
        _id: sub,
        name: name,
        email,
        picture,
        _v: 0,
      }
      token = res?.credential
      localStorage.setItem('profile', JSON.stringify({result, token}))
    } 

    
    try {
      dispatch({type: 'AUTH', data: {result, token}})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };


  const googleFailure = (err) => {
    toast.error("Google Sign In was unsuccessful. Try Again Later")
    console.log(err)
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
          <Button
                className={classes.googleButton}
                color="inherit"
                fullWidth variant="contained"
                startIcon={<Icon/>}>
          <GoogleLogin 
            onSuccess={credentialResponse => googleSuccess(credentialResponse)}
            onError={() => googleFailure}
            
          />;
          </Button>
         
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
