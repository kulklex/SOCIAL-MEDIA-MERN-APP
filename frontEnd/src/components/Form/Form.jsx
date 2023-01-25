import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, updatePost } from "../../redux/actions/posts";
import { useNavigate } from "react-router-dom";

export default function Form({currentId, setCurrentId}) {
  const classes = useStyles();
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
  const [postData, setPostData] = useState({
    title: " ",
    message: " ",
    tags: [],
    selectedFile: " ",
  });

 

  const clear = () => {
    setCurrentId(0)
    setPostData({ title: '', message: '', tags: [], selectedFile: '' })
  }

  useEffect(() => {
    if (!post?.title) clear()
    if(post) setPostData(post)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);


  const handleSubmit = async (e) => {
    e.preventDefault(); //to avoid getting the refresh in the browser

    if(currentId === 0) {
      dispatch(createPosts({...postData, name: user?.result?.name }, navigate));
    } else {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}, navigate));
    } 
    clear()
  };


  if(!user?.result?.name){
    return (<Paper className={classes.paper} >
      <Typography variant="h6" align="center" >
        Please Sign In to create your posts and like other people's posts
      </Typography>
    </Paper>)
  }
 
  return (
    <>
      <Paper className={classes.paper} elevation={6}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            minRows={4}
            value={postData.message}
            onChange={(e) => {
              setPostData({ ...postData, message: e.target.value });
            }}
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(",") });
            }}
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
}
