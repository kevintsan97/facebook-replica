import * as api from '../api'
import { FETCH_ALL,UPDATE,DELETE,CREATE,FETCH_BY_SEARCH } from '../constants/actionTypes'
// Action Creators

export const getPosts = (page) => async (dispatch) =>{

    try{
        const {data} = await api.fetchPosts(page)
        console.log(data);
        dispatch({type: FETCH_ALL, payload: data})
    }

    catch(error){
        console.log(error.message)
    }
  
}

export const getPostsBySearch = (searchQuery) => async (dispatch) =>{
    try{
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data})
    }
    catch(error){
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) =>{
    try{
        const {data}  = await api.createPost(post)
        
        dispatch({type: CREATE, payload: data})
    }
    catch(error){
        console.log(error.message)
    }
}

export const updatePost = (currentId, post) => async(dispatch) =>{
    try{
        const { data } = await api.updatePost(currentId, post)
        
        dispatch({type: UPDATE, payload: data})
    }
    catch(error){
        console.log(`UPDATE - ${error.message}`)
    }
}

export const likePost =  (currentId) => async(dispatch) =>{
    try{
        const {data} = await api.likePost(currentId)
        dispatch({type:UPDATE, payload: data})
    }
    catch(error){
        console.log(error)
    }
}

export const deletePost = (currentId) => async(dispatch) =>{
    try{
        await api.deletePost(currentId)
        dispatch({type: DELETE, payload: currentId})
    }
    catch(error){
        console.log(error)
    }
}


