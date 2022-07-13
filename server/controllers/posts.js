const mongoose = require('mongoose')
const PostMessage = require('../models/postMessage')
const { post } = require('../routes/posts')

const getPosts = async (req,res) =>{
    try{
        const postMessage = await PostMessage.find()
        return res.status(200).json(postMessage)
    }
    catch(error){
        res.status(404).json({error: error.message})
    }

}

const createPosts = async (req,res) =>{
    const post = req.body
    const newPost = new PostMessage(post)
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
    
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id')

    const post = await PostMessage.findById(_id)
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{likeCount: post.likeCount + 1}, {new:true})

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
    likePost
}