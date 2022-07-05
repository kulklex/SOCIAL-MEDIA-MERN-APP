import React from 'react'
import Post from './Post/Post'
import useStyles from "./styles"
import {useSelector} from 'react-redux'
import { CircularProgress, Grid } from '@material-ui/core'

export default function Posts() {
  const post = useSelector((state) => state.posts)
  console.log(post);
  const classes = useStyles()

   if (post.length === 0){
    return (<CircularProgress/>)
   } else {
    return (<Grid className={classes.container} container alignItems="stretch" spacing="">
      {post.map((posts) => (
        <Grid key={posts.id} item xs={12} sm={6}>
          <Post post={posts}/>
        </Grid>
      ))}
    </Grid>)
   }
  
}
