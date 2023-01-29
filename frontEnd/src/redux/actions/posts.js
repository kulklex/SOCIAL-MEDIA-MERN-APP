import * as api from "../../api/index"
import {CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT} from "./actionTypes"
import {toast} from "react-toastify"


//Action Creators (functions that return an action)
export const getPosts = (page) =>  async (dispatch) =>  {
    try {
        dispatch({type: START_LOADING})
        const {data: {data, currentPage, numberOfPages}} = await api.fetchPosts(page);
         dispatch({type: FETCH_ALL, payload: {data, currentPage, numberOfPages}})
         dispatch({type: END_LOADING})
    } catch (error) {
        console.error(error)
    }
}

export const getPostsBySearch = (search) =>  async (dispatch) =>  {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPostsBySearch(search)
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message)
        }
        console.log(error);
    }
}


export const getPostsById = (id) => async (dispatch) =>  {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPostById(id)
        dispatch({type: FETCH_POST, payload: {post: data}})
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message)
        }
        console.log(error);
    }
}

export const createPosts = (post, navigate) =>  async (dispatch) =>  {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.createPosts(post)
        navigate(`/posts`)
        dispatch({type: CREATE, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message)
            console.error(error)
        }
        console.error(error)
    }

}

export const updatePost = (id, post, navigate) =>  async (dispatch) =>  {
    try {
        const {data: {data}} = await api.updatePost(id, post);
        navigate(`/posts`);
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message)
        }
        console.error(error)
    }

} 

export const likePost = (id) => async (dispatch) => {
    try {
       const {data} = await api.likePost(id) 
       dispatch({type: LIKE, payload: data})
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message)
        }
        console.error(error)
    }
}

export const commentPost = (comment, postId) => async (dispatch) => {
    try {
      const {data} =  await api.commentPost(comment, postId)
      dispatch({type: COMMENT, payload: data})

      // This is to return the latest comment
      return data.comments
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message)
        }
        console.error(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.error(error)
    }
}
