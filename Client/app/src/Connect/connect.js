import React,{Component} from 'react';
import FriendCard from './FriendCard'
import axios from 'axios';
import {connect} from 'react-redux';

class Connect extends Component{

    constructor() {
        super();
        this.state =  {
            people: []
        }
    }
    componentDidMount() {
        axios.get('users/getPeople',{params: {userId: this.props.auth.userId}}).then(res => {
            console.log(res);
            this.setState({
                ...this.state,
                people : res.data.people
            })
            }
        )
    }

    render() {
        return(

                this.state.people.map((user,index) => {
                return <FriendCard key = {user.id} id = {user.id} username = {user.username} description = {user.description}   />

            })


        )
    }

}

const mapStateToProps = state => {
    return {...state}
}

export default connect(mapStateToProps,null)(Connect);
