import * as api from "../../api/index"
import { AUTH } from "./actionTypes";
import { toast} from "react-toastify"


export const signin =  (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData)
        dispatch({type: AUTH, data})
        navigate('/')
    } catch (error) {
        if(error.response) {
            const {data} = error.response
            toast.error(data.message)
        }
        console.log(error)   
    }
}

export const signup =  (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData)
        dispatch({type: AUTH, data})
        navigate('/')
    } catch (error) {
        if(error.response) {
            const {data} = error.response
            toast.error(data.message)
        }
        console.log(error)
    }
}