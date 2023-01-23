import React from 'react'
import Post from './Post/Post'
import useStyles from "./styles"
import {useSelector} from 'react-redux'
import { CircularProgress, Grid } from '@material-ui/core'


export default function Posts({setCurrentId}) {
  const post = useSelector((state) => state.posts)
  const classes = useStyles()
  if (typeof(post) == undefined){
    return (<h1>No Posts!</h1>)
   }

  if (post.length == 0){
    return (<CircularProgress/>)
   }  else {
    return (<Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {post.map((posts) => (
        <Grid key={posts?._id} item xs={12} sm={6} md={6}>
          <Post post={posts} setCurrentId={setCurrentId}/>
        </Grid>
      ))}
    </Grid>)
   }
  
}
