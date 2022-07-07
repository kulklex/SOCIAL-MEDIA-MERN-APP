import React from 'react'
import useStyles from "./styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../redux/actions/posts';


export default function Post({post, setCurrentId}) {
    const classes = useStyles()
    const dispatch = useDispatch()


  return (
   <Card className={classes.card}>
    <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
      <div className={classes.overlay}>
      <Typography variant='h3'>{post.title}</Typography>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size='small' onClick={() => {setCurrentId(post._id)}}>
          <MoreHorizIcon fontSize='medium'/>
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
      <Typography className={classes.title} variant='body2' color='textSecondary' gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color='primary' onClick={() => {dispatch(likePost(post._id))} }>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button size="small" color='primary' onClick={() => {dispatch(deletePost(post._id))} }>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
   </Card>
  )
}
