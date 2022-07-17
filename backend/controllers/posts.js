const mongoose = require('mongoose')
const PostMessage = require('../models/postMessage.js')


const getPosts = async (req, res) => {
   try {
       const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
   } catch (error) {
       res.status(404).json({message: error.message})
   }
}

const createPosts = async (req, res) => {
    const post = req.body //req.body gives you access to all data inputted (i.e. the body of the data, the actual data)
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()}) 
    try {
        const savedPost = await newPost.save() //saving the post data (the data inputted) into the database
        res.status(201).json(savedPost)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const updatePost = async (req, res) => {
    const {id: _id}  = req.params  
    const {title, message, selectedFile, creator, tags} = req.body


    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('The Id of this post does not exist')
    //this checks if the id exist 

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {title, message, selectedFile, creator, tags}, {new: true})
        //findByIdAndUpdate receives three parameters, the id, the input field body, and the {new: true} statement
        // {new: true} here is for you to receive the updated version of the input fields (title, creator....)
         res.status(201).json(updatedPost)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const deletePost = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("The Id does not exist")

    const deletedPost = await PostMessage.findByIdAndRemove(id)
    res.status(200).json({message: 'Post deleted successfully'})
}


const likePost = async (req, res) => {
    const {id} = req.params
    if(!req.userId) return res.json({message: "Authorization Failed"}) //What's happening here is we're expecting a req.userId property from jwt in the verify middleware that'll be passed before this likePost controller, so we're making sure it is available else it should throw an error
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("The Id does not exist")

    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId)) 
    //findIndex() returns the index number of the first element in an array to satisfy/pass the test written inside the parenthesis of the method
    //In this case, we're looking for the first id in the likes array that is equal to the req.userId we're expecting from the middleware
    //note that each like is going to have an id from a specific person, that's how we'll know who liked the specific post  

    if(index === -1){
        //Note that array index position -1 means the position doesn't exist
        //so this will happen in this case only if the all the id we iterated through aren't equal to the req.userId(converted to string)
        //once none of them is equal to req.userId we push req.userId and add it to the ids in the likes array
        post.likes.push(req.userId)
    } else {
        //if there's a match for the id and req.userId
        //we'll fetch all the likes except the current person's like i.e. we're filtering the likes array
        post.likes = post.likes.filter(id => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

    res.status(200).json(updatedPost)
}

module.exports = {getPosts, createPosts, deletePost, updatePost, likePost}