import {CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, FETCH_BY_SEARCH} from "../actions/actionTypes"

export default function reducer (posts = [] /*Initial State*/, action) {
    switch (action.type) {
        case CREATE:
             return [...posts, action.payload]              
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        case UPDATE:
            return posts.map((post) => post.id === action.payload._id ? action.payload : post)
        case FETCH_ALL:
            return action.payload
         case FETCH_BY_SEARCH:
            return action.payload
        default:
            return posts
    }
}