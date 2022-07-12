import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.avif";
import useStyles from "../../styles";
import { Link } from "react-router-dom";


const Navbar = () => {
  const classes = useStyles();
  const user = null

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
        <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
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
