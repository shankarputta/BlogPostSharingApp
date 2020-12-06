import React , {Component} from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import Profile from "./Profile";
import Posts from "../Posts/Posts";

class ViewProfile extends Component{
    constructor() {
        super();
        this.state = {
            userDetails: {},
            Posts: []
        }
    }

    onUnFollowHandler = () => {
        axios.post('/users/unfollow',{userId : this.props.auth.userId,unfollowUserId : this.props.match.params.id}).then(response =>
        {
            this.setState({
                ...this.state,
                userDetails: response.data
            })
        })
    }

    onFollowHandler  = () => {
        axios.post('/users/follow',{userId : this.props.auth.userId,followUserId : this.props.match.params.id}).then(response =>
        {
            this.setState({
                ...this.state,
                userDetails: response.data
            })
        })
    }


    componentDidMount() {
        const userId =  this.props.match.params.id;
        axios.get('users/getProfile',{params:{userId: this.props.auth.userId, profileId: userId }}).then(response => {
            this.setState({
                ...this.state,
                userDetails : response.data
            })
        })
        axios.get('posts/',{params:{userId: userId}}).then(response => {
            this.setState({
                ...this.state,
                Posts : response.data.posts
            })
        })


    }

    render() {

        return (
            <div>
                <Profile userDetails = {this.state.userDetails}  onUnFollowHandler = {this.onUnFollowHandler} onFollowHandler={this.onFollowHandler} />
                <Posts PostsDetails={this.state.Posts} />
            </div>
        );

    }


}


const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps,null) (ViewProfile);
