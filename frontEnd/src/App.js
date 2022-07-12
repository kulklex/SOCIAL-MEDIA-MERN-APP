import React, {useEffect, useState} from "react";
import "./App.css";
import { Container, Grid, Grow} from "@material-ui/core"
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from "./styles"
import {useDispatch} from 'react-redux'
import { getPosts } from "./redux/actions/posts"
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [currentId, setCurrentId] = useState(null); 
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])
  

  return <Container maxWidth="lg">
    <Navbar/>
    <Grow in>
      <Container>
        <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}><Posts setCurrentId={setCurrentId}/></Grid>
          <Grid item xs={12} sm={4}><Form currentId={currentId} setCurrentId={setCurrentId}/></Grid>
        </Grid>
      </Container>
    </Grow>


 
  </Container>;
}

export default App;
