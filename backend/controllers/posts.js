const PostMessage = require('../models/postMessage.js')


const getPosts = async (req, res) => {
   try {
       const postMessages = await (await PostMessage.find())
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


module.exports = {getPosts, createPosts}