import {AUTH, LOGOUT} from "../actions/actionTypes"

const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data})) //set the credentials the user inputs in our local storage and sending them for dispatch
            return {...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear()
            return {...state, authData: null}
        default:
            return state;
    }
}

export default authReducer