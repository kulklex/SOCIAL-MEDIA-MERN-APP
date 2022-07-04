import * as api from "../../api/index"

//Action Creators (funtions that return an action)
export const getPosts =  async (dispatch) =>  {
    try {
        const {data} = await api.fetchPosts();
         dispatch({type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.error(error)
    }

}