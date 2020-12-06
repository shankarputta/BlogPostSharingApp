import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class CreatePost extends Component {

    constructor() {
        super();
        this.state = {
            title : '',
            description: '',
            success: false,
            error: false
        }
    }

    onTitleChange = (event) => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    }

    onDescriptionChange = (event) => {
        this.setState({
            ...this.state,
            description: event.target.value
        })
    }

    onPostSubmit = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            posting: true

        })
        axios.post('/posts/createPost',{userId: this.props.auth.userId,
            title: this.state.title,description: this.state.description}).then(response => {
             if (response.status === 200 ) {
                 this.setState({
                     title: '',
                     description: '',
                     success: true,
                     posting: false
                 })
                 setTimeout(() => {
                     this.setState({
                         ...this.state,
                         success: false
                     })
                 },2000);
             }

        }).catch(error => {
          this.setState({
                  ...this.state,
                  error: true,
              posting:false
              }
          )
            setTimeout(()=>{this.setState({...this.state,error:false})},2000)
        })

    }


    render = () => {

        return (
            <div className='container mt-5'>
                {this.state.success && <div className="alert alert-success" role="alert">
                    Post Created SuccessFully
                </div>}
                {this.state.error &&  <div className="alert alert-danger" role="alert">
                    Unknown Error Occurred Please Try Again after some time
                </div>

                }
                <h2 className='text-center'>Create Post</h2>

            <form onSubmit={this.onPostSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1"><h4>Title</h4></label>
                    <input type="input" value={this.state.title} onChange={this.onTitleChange} className="form-control" id="exampleFormControlInput1"
                           placeholder="The Great Story...!"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1"><h4>Write Your Story</h4></label>
                    <textarea onChange={this.onDescriptionChange} value={this.state.description} className="form-control" id="exampleFormControlTextarea1" rows="10" placeholder="The Story Goes like this......"></textarea>
                </div>
                <button disabled={(this.state.description.length === 0 && this.state.title.length === 0) || this.state.posting} type = 'submit' className='btn btn-primary'>Submit</button>
            </form></div>

            )
    }




}
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps,null)(CreatePost);
