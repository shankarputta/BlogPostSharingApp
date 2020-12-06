import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios' ;
import {createStore} from "redux";
import {Provider} from "react-redux";
import authReducer from "./Store/authReducer";

const store = createStore(authReducer);

axios.defaults.baseURL = 'https://blogpostsharing.azurewebsites.net/';
ReactDOM.render(
  <React.StrictMode >
      <Provider store={store}>
          <App />
      </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals( );
