const express = require('express')
const router = express.Router()
const {getPosts, createPosts} = require('../controllers/posts')

router.get('/', getPosts)
router.post('/', createPosts)




module.exports = router;