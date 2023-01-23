import React, {useEffect, useState} from "react";
import "./App.css";
import { Container, Grid, Grow, Paper, AppBar, TextField, Button} from "@material-ui/core"
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from "./styles"
import {useLocation, useNavigate} from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import {useDispatch} from 'react-redux'
import { getPosts, getPostsBySearch } from "./redux/actions/posts"
import Navbar from "./components/Navbar/Navbar";
import Pagination from "./components/Pagination/Pagination";


//We are trying to implement the search functionality
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function App() {
  const [currentId, setCurrentId] = useState(0); 
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()

  // This is going to read our url and see if we have a page parameter in there 
  // so it can populate the variable to that page number 
  // or it'll just be 1, meaning the first page
  const page = query.get('page') || 1

  const searchQuery = query.get('searchQuery')

  
  const handleKeyPress = (e) => {
    // KeyCode 13 is the enter key, so if the user presses enter
    if (e.keyCode === 13){
      searchPosts()
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag])
  const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag!== tagToDelete))
  
  const searchPosts = () => {
    if(search.trim()  || tags){
      //Because we can't pass an array through the url parameter,
      // we need to convert it to a string with the join method, they are each separated by a comma
      //i.e an array like ['europe', 'asia'] will become 'europe,asia'
      dispatch(getPostsBySearch({search, tags: tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])
  

  return <Container maxWidth="xl">
    <Navbar/>
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>

          <Grid item xs={12} sm={3} md={3}>
            <AppBar position="static" color="inherit" className={classes.appBarSearch}>
              <TextField name="search" variant="outlined" label="Search Post" fullWidth 
              onKeyPress={handleKeyPress}  onChange={(e) => {setSearch(e.target.value)}}/>

              <ChipInput style={{margin: '10px 0'}} value={tags} label="Search Tags" variant="outlined" 
                onAdd={handleAdd} onDelete={handleDelete} />
              
              <Button variant="contained" color="primary" className={classes.searchButton}
               onClick={searchPosts}>Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
          </Grid>

          {(!searchQuery && !tags.length) && (
            <Paper elevation={6} className={classes.pagination}> <Pagination page={page}/> </Paper>
          )}
        </Grid>
      </Container>
    </Grow>


 
  </Container>;
}

export default App;
