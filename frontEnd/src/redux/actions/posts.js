import * as api from "../../api/index"

//Action Creators (funtions that return an action)
export const getPosts = () =>  async (dispatch) =>  {
    try {
        const {data} = await api.fetchPosts();
         dispatch({type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.error(error)
    }

}

export const createPosts = (post) =>  async (dispatch) =>  {
    try {
        const {data} = await api.createPosts(post);
         dispatch({type: 'CREATE', payload: data})
    } catch (error) {
        console.error(error)
    }

}

export const updatePost = (id, post) =>  async (dispatch) =>  {
    try {
        const {data} = await api.updatePost(id, post);
         dispatch({type: 'UPDATE', payload: data})
    } catch (error) {
        console.error(error)
    }

}