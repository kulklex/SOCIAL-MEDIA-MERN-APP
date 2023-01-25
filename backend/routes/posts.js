const express = require('express')
const router = express.Router()
const {getPosts, createPosts, deletePost, updatePost, likePost, getPostsBySearch, getPostById, commentPost} = require('../controllers/posts')
const {verify} = require("../middleware/verify")

router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.get('/:id', getPostById)
router.post('/', verify, createPosts)
router.post('/:id/comments', verify, commentPost)
router.patch('/:id', verify, updatePost)
router.delete('/:id', verify, deletePost)
router.patch('/:id/like', verify, likePost)




module.exports = router;