const express = require('express')
const router = express.Router()
const {getPosts, createPosts, deletePost, updatePost, likePost} = require('../controllers/posts')
const {verify} = require("../middleware/verify")


router.get('/', getPosts)
router.post('/', verify, createPosts)
router.patch('/:id', verify, updatePost)
router.delete('/:id', verify, deletePost)
router.patch('/:id/like', verify, likePost)



module.exports = router;