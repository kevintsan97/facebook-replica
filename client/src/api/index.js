import axios from 'axios'

const url =  'http://localhost:5000/posts'

export const fetchPosts = () => axios.get(url)
export const createPost = (newPost) => axios.post(url, newPost)
export const updatePost = (currentId, updatedPostData) => axios.patch(`${url}/${currentId}`, updatedPostData)
export const likePost= (currentId) => axios.patch(`${url}/${currentId}/likePost`)
export const deletePost = (currentId) => axios.delete(`${url}/${currentId}`)
