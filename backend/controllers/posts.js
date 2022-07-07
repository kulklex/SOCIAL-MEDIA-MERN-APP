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
    const {title, message, selectedFile, creator, tags} = req.body //req.body gives you access to all data inputed (i.e. the body of the data, the actual data)
    const newPost = new PostMessage({title, message, selectedFile, creator, tags}) 
    try {
        const savedPost = await newPost.save() //saving the post data (the data inputed) into the database
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

module.exports = {getPosts, createPosts, deletePost, updatePost}