import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Routes, Route, Navigate,  } from "react-router-dom";
import App from "./App";
import "./index.css";
import { rootReducer } from "./redux/reducers/index";
import Auth from "./components/Auth/Auth";
import PostDetail from "./components/Posts/PostDetails/PostDetail";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const element = document.getElementById("root")
const root = ReactDOM.createRoot(element)
const user = JSON.parse(localStorage.getItem("profile"));
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Because there's no Home Page, We are redirecting the Home path to the Posts path */}
        <Route path="/" element={<Navigate to='/posts'/>} /> 
        <Route path="/posts"  element={<App />} />
        <Route path="/posts/search"  element={<App />} />
        <Route path="/posts/:id"  element={<PostDetail />} />
        <Route path="/auth"  element={ user ? <Navigate to='/posts'/> : <Auth />}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </Provider>
);
