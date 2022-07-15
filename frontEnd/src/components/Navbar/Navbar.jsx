import React, {useState, useEffect} from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.avif";
import useStyles from "../../styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))) //getting the credentials with name 'profile' from the local storage
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const logout = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/')
    setUser(null)
  }

  //using the use effect so we do not have to explicitly refresh the user state 
  useEffect(()=> {
    const token = user?.token

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/">  
        <Typography  className={classes.heading}  variant="h2" align="center">
          Memories
        </Typography>
         </Link>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
    {
      user ? (<div className={classes.profile}>
        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imagUrl}> {user.result.name.charAt(0)} </Avatar>
        <Typography className={classes.username} variant="h6">{user.result.name}</Typography>
        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
      </div>) : (
        <Link to='/auth'>
        <Button variant="contained" color="primary">Sign In</Button>
        </Link>
      )
    }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
