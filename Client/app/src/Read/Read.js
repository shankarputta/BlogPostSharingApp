import React,{Component} from "react";
import axios from 'axios';

class Read extends Component {
    constructor() {
        super();
        this.state = {
            title : '',
            description: ''
        }
    }
    componentDidMount() {

        axios.get('/posts/getPost',{params: {postId: this.props.match.params.id}}).then (response => {
            console.log(response)
        this.setState({
            ...this.state,
            title:response.data.Title,
            description:response.data.Description
        })

        })

    }

    render() {
       return( <div >
           <h1 className='text-center'>{this.state.title}</h1>
           <p className='text-secondary text-center'>{this.state.description}</p>
        </div>)
    }
}

export default Read;
