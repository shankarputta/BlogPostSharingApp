import React , {Component} from 'react'
import Post from '../Post/Post'
import {withRouter} from 'react-router-dom';

class Posts extends Component{

    render(){
        console.log(this.props.PostsDetails)

        return (
       this.props.PostsDetails.map((post,index)=>{
         return  <Post onDelete = {this.props.onDelete} key = {index} id = {post.id} Date  = {post.createdAt} username={post.username} Title = {post.Title} Description = {post.Description}/>})
        )




    }










}


export default withRouter(Posts);

