import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Profile from "../Profile/Profile";
import Posts from "../Posts/Posts";
class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            userDetails: {},
            Posts: [],
            deleteFail: false,
            deleteSuccess: false


        }
    }

    onDelete = (id) => {
        axios.delete('posts/deletePost',{params:{postId:id, userId: this.props.auth.userId}}).then (response => {
            this.setState({
                ...this.state,
                Posts : response.data.posts,
                deleteSuccess: true
            });
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    deleteSuccess: false
                })
            },2000)

        }).catch(error => {
            this.setState({
                ...this.state,
                deleteFail: true
            })
            setTimeout(() => {
            this.setState({
                ...this.state,
                deleteFail: false
            })},2000)
        })

    }



    componentDidMount() {

       const userId = this.props.auth.userId
       axios.get('users/',{params:{userId: userId}}).then(response => {

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

    render () {
        return (
            <div>
            <Profile userDetails = {this.state.userDetails}  onFollowHandler={this.onFollowHandler} />
                {this.state.deleteSuccess && <div className="alert  container alert-success" role="alert">
                   SuccessFully Deleted the Post
                </div>}
                {
                    this.state.deleteFail && <div className="alert container alert-danger" role="alert">
                        Unknow Error Occurred Unable to delete the Post..
                    </div>
                }
                <Posts PostsDetails={this.state.Posts} onDelete = {this.onDelete} />
            </div>
        );

    }


}




const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(UserProfile);
