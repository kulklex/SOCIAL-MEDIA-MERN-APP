import React from "react";
import ReactDOM from "react-dom";
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

const user = JSON.parse(localStorage.getItem("profile"));
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Because there's no Home Page, We are redirecting the Home path to the Posts path */}
        <Route path="/" exact element={<Navigate to='/posts'/>} /> 
        <Route path="/posts" exact element={<App />} />
        <Route path="/posts/search" exact element={<App />} />
        <Route path="/posts/:id" exact element={<PostDetail />} />
        <Route path="/auth" exact element={ user ? <Navigate to='/posts'/> : <Auth />}></Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </Provider>,
  document.getElementById("root")
);
