const express = require('express')
const router = express.Router()
const {getPosts, createPosts, deletePost, updatePost, likePost} = require('../controllers/posts')

router.get('/', getPosts)
router.post('/', createPosts)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/like', likePost)



module.exports = router;