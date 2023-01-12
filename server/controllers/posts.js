const mongoose = require('mongoose')
const PostMessage = require('../models/postMessage')
const { post } = require('../routes/posts')

const getPosts = async (req,res) =>{

    const {page} = req.query;
    try{
        const LIMIT = 4;
        // Get starting index of every page
        const startIndex = (Number(page) -1) * LIMIT;
        const total = await PostMessage.countDocuments({})
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)
        return res.status(200).json({data: posts, currentPage:Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    }
    catch(error){
        res.status(404).json({error: error.message})
    }

}

 const getPostsBySearch = async ( req,res) =>{
    const {searchQuery, tags} = req.query
    try{
        const title  = new RegExp(searchQuery, 'i')

        const posts = await PostMessage.find({$or: [{title}, {tags:{$in: tags.split(',')}}] });

        res.json({data: posts});
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

const createPosts = async (req,res) =>{
    const post = req.body
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    try{
        await newPost.save()

        return res.status(201).json(newPost)
    }
    catch(error){
        res.status(409).json({error: errorr.message})
    }

}

 const updatePost = async(req,res) =>{
    const {id : _id} = req.params
    const post =req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) 
        return res.status(404).send('No post with that id')
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, {new : true})
   return res.json(updatedPost)

}

const likePost = async(req,res) =>{
    const {id: _id} = req.params
    
    if(!req.userId) return res.json({message: "Unauthenticated"})


    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id')

    const post = await PostMessage.findById(_id)
    
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if(index  === -1){
        post.likes.push(req.userId)
    }
    else{
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new:true})

    return res.json(updatedPost)

}

const deletePost = async(req,res) =>{
    const {id: _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id")

    await PostMessage.findByIdAndRemove(_id)
    return res.status(202).json({message: "Delete successfully!"})
}
module.exports = 
{
    getPosts,
    createPosts,
    updatePost,
    deletePost,
    likePost,
    getPostsBySearch
}