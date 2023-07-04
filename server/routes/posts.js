const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {getPostsBySearch,getPosts,getPost,createPosts, updatePost,deletePost,likePost} = require('../controllers/posts')

router.get('/search', getPostsBySearch);
router.get('/', getPosts)
router.get('/:id',getPost)
router.post('/', auth, createPosts)
router.patch('/:id', auth, updatePost)
router.patch('/:id/likePost',auth, likePost)
router.delete('/:id',auth, deletePost)

module.exports = router