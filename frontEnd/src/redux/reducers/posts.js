import {CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT} from "../actions/actionTypes"

export default function reducer (state = {isLoading: true, posts: []} /*Initial State*/, action) {
    switch (action.type) {
        case CREATE:
             return {...state, posts:action.payload}              
        case LIKE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
        case UPDATE:
            // Firstly we return all the other posts normally
            // Then change only the post that is being updated
            return {...state, posts: state.posts.map((post) => post.id === action.payload._id ? action.payload : post)}
        case FETCH_ALL:
            return {
                ...state,
                posts:action.payload.data,
                currentPage: action.payload.currentPage, 
                numberOfPages: action.payload.numberOfPages
            }
         case FETCH_BY_SEARCH:
            return {...state, posts: action.payload.data}
        case FETCH_POST:
            return {...state, post: action.payload.post}
        case COMMENT:
            // Firstly we return all the other posts normally
            // Then change only the post that just received a comment
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case START_LOADING:
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        default:
            return state
    }
}