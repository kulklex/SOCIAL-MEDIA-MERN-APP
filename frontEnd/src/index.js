import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import {rootReducer} from "./redux/reducers/index"



const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <App/>
    </Provider>
  </>
);

reportWebVitals();
