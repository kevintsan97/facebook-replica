import axios from 'axios'
const API = axios.create({ baseURL: 'http://localhost:5000'})
API.interceptors.request.use((req) =>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'} &tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (currentId, updatedPostData) => API.patch(`${'/posts'}/${currentId}`, updatedPostData)
export const likePost= (currentId) => API.patch(`${'/posts'}/${currentId}/likePost`)
export const deletePost = (currentId) => API.delete(`${'/posts'}/${currentId}`)


export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)