import React from 'react'
import useStyles from "./styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../redux/actions/posts';
import Likes from '../Likes';
import { Link, useNavigate } from 'react-router-dom';

 function Post({post, setCurrentId}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('profile')) 
    const deleteThePost = () => {
    if (window.confirm("Are you sure you want to delete this post")){
        return  dispatch(deletePost(post._id))
    } 
  }

 
  

  return (
   <Card className={classes.card}>
    <Link style={{textDecoration: 'none'}} to={`/posts/${post._id}`}  >
    <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title}/>
      <div className={classes.overlay}>
      <Typography variant='h3'>{post.title}</Typography>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
        {/* To make sure only user that created the post can edit it*/} 
      {(user?.result?.googleId === post?.creator || user?.result?._id === post.creator) &&(
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size='small' onClick={(e) => {
          e.stopPropagation(); // stop propagation
          setCurrentId(post?._id)
        }}>
          <MoreHorizIcon fontSize='medium'/>
        </Button>
      </div>
      )}
      <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
      </CardContent>
      </Link>
      <CardActions className={classes.cardActions}>
        <Button size="small" color='primary'  disabled={!user?.result} onClick={() => {dispatch(likePost(post._id))} }>
          <Likes post={post} user={user}/>
        </Button>
        

       {/* To make sure only user that created the post can delete it*/} {(user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && ( 
          <Button size="small" color='primary' onClick={deleteThePost}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
        )}
      </CardActions>
   </Card>
  )
}


export default Post
