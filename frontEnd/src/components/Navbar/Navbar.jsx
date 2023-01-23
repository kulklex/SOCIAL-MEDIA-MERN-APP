import React, {useState, useEffect} from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
// import memories from "../../images/memories.avif";
import useStyles from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'


const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))) //getting the credentials with name 'profile' from the local storage
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const logout = () => {
    if(window.confirm("You are about to logout")){
    dispatch({type: 'LOGOUT'})
    navigate('/auth')
    setUser(null)
    window.location.reload();
  }
  }

  //using the use effect so we do not have to explicitly refresh the user state 
  useEffect(()=> {
    const token = user?.token
    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    } // What this part does is, it makes sure that when the token expires the user is logged out

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  
  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/" style={{textDecoration: 'none'}}>  
        <Typography  className={classes.heading}  variant="h4" align="center">
          Social-Media
        </Typography>
         </Link>
        {/* <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        /> */}
      </div>
      <Toolbar className={classes.toolbar}>
      {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )
      }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
