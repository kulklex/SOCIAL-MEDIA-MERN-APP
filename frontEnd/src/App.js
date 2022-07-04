import React, {useEffect} from "react";
import "./App.css";
import {AppBar, Container, Grid, Grow, Typography} from "@material-ui/core"
import memories from "../src/images/memories.avif"
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from "./styles"
import {useDispatch} from 'react-redux'
import { getPosts } from "./redux/actions/posts"
import Counter from "./redux/sets/Counter";


function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  

  return <Container maxWidth="lg">
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
      <img className={classes.image} src={memories} alt="memories" height="60" />
    </AppBar>
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}><Posts/></Grid>
          <Grid item xs={12} sm={4}><Form/></Grid>
        </Grid>
      </Container>
    </Grow>
    <Counter/>
  </Container>;
}

export default App;
