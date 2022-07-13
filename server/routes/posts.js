const express = require('express')
const router = express.Router()
const {getPosts,createPosts, updatePost,deletePost,likePost} = require('../controllers/posts')


router.get('/', getPosts)
router.post('/',createPosts)
router.patch('/:id',updatePost)
router.patch('/:id/likePost',likePost)
router.delete('/:id',deletePost)

module.exports = router