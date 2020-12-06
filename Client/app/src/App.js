import logo from './logo.svg';
import './App.css';
import Posts from './Posts/Posts.js'
import React , { Component } from 'react';
import Profile from "./Profile/Profile";
import NavBar from "./Navbar/Navbar";
import Signup from './Signup/Signup'
import {BrowserRouter} from "react-router-dom";
import CreatePost from "./CreatePost/CreatePost";



//intialize the axios withe the base url


class App extends Component{



  render(){


    return (
<BrowserRouter>
  <NavBar/>

  {/*<CreatePost />*/}
</BrowserRouter>
)
  }

}



export default App;
