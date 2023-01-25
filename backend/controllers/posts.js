const mongoose = require('mongoose')
const PostMessage = require('../models/postMessage.js')


const getPosts = async (req, res) => {
      const {page} = req.query //we are integrating pagination so our posts can be split into pages 
   try {
       const LIMIT = 10 //The limit of posts per page
       const startIndex = (Number(page) - 1) * LIMIT //The index number of the post each page should begin with, its -1 because index starts from 0
       // i.e second and third page will start posts from index numbers 20 and 30 respectively since our LIMIT is 10 per page
       
       const total = await PostMessage.countDocuments() //To get the total number of posts, it'll help confirm the last page we can scroll to
       const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex) 
       //It'll sort the posts by newest to oldest then limit them to out LIMIT variable, and finally we skip all the previous pages so only gets posts from the startIndex of the page
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})
   } catch (error) {
       res.status(404).json({message: error.message})
   }
}

const getPostById = async (req, res) => {
    const {id} = req.params
    try {
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({message: error.message})
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


const getPostsBySearch = async (req, res) => {
    const {searchQuery, tags} = req.query
    try {
        const title = new RegExp(searchQuery, 'i') //i stands for case insensitive
        const posts = await PostMessage.find({$or: [{title}, {tags: {$in: tags.split(',')}}]})
        // The 'posts' variable is literally saying find me all the posts that match either exactly the title or tags (is one of the tags in the array of tags equal to tags variable that is gotten from the query, req.query.tags)
        res.status(200).json({data: posts})
    } catch (error) {
        res.status(404).json({message: error.message})   
    }
}


const commentPost = async (req, res) => {
    const {id} = req.params
    const {comment} = req.body

    try {
        //first we find the posts that we are commenting on
        const post = await PostMessage.findById(id)
        
        post.comments.push(comment)

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

        return res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {getPosts, createPosts, deletePost, updatePost, likePost, getPostsBySearch, getPostById, commentPost}