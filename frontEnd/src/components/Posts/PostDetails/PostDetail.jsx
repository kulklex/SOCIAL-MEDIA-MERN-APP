import React    , {useEffect} from 'react';
import useStyles from './styles'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom';
import {getPostsById, getPostsBySearch} from '../../../redux/actions/posts'
import Navbar from './../../Navbar/Navbar';
import Comments from '../Comments';


const PostDetail = () => {
    const classes = useStyles();
    const {post, posts, isLoading} = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        dispatch(getPostsById(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if(post){
            dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',')}))
        } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])
    


    const recommendedPosts = posts?.filter(({_id}) => _id !== post?._id)
    
    if (!post) return null


    if(isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size='7rem'/>
        </Paper>
    }


    const openPost = (_id) => navigate(`/posts/${_id}`)



    return (<>
    <Navbar/>
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">{post?.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
            <Typography variant="h6">Created by: {post?.name}</Typography>
            <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
            {/* <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography> */}
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1">
              <Comments post={post}/>
            </Typography>
            <Divider style={{ margin: '20px 0' }} />
          </div>
          <div className={classes.imageSection}>
            <img  className={classes.media} alt=" " srcSet={post?.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
          </div>
        </div>
        {recommendedPosts?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
             {recommendedPosts?.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message.split(' ').splice(0, 10).join(' ')}...</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes?.length}</Typography>
                <img src={selectedFile} alt={title} width="200px" />
              </div>
            ))} 
          </div>
        </div>
        )}
    </Paper>
    </>);
}

export default PostDetail;
