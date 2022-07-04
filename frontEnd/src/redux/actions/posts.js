import * as api from "../../api"

//Action Creators (funtions that return an action)
export const getPosts =  async (dispatch) =>  {
    try {
        const {data} = await api.fetchposts() 
        dispatch({type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.error(error)
    }

}