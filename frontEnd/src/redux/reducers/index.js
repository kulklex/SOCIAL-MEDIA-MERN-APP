import { combineReducers } from "redux"
import posts from "./posts"
import auth from './auth';

export  const rootReducer = combineReducers({
    posts, auth
})