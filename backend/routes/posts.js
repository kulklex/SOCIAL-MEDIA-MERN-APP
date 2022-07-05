const express = require('express')
const router = express.Router()
const {getPosts, createPosts, updatePost} = require('../controllers/posts')

router.get('/', getPosts)
router.post('/', createPosts)
router.patch('/:id', updatePost)



module.exports = router;