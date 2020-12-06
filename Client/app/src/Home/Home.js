import React,{Component} from 'react';
import {connect} from 'react-redux';
import Posts from "../Posts/Posts";
import axios from 'axios';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };
    }

  componentDidMount() {
        axios.get('/posts/allPosts',{params : {userId: this.props.auth.userId}}).then( res => {
            console.log(res);
            this.setState({
                ...this.state,
                posts : res.data.data,
            })
        })

    }

    render() {
        return (
            <Posts PostsDetails = {this.state.posts}  />
        )
    }


}

const mapStateToProps = state => {
    return {
       ...state
    }
}


export default connect(mapStateToProps,null)(Home);
