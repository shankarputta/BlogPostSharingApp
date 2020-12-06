import React,{Component} from 'react';
import './Login.css';
import axios from 'axios';
import {connect} from 'react-redux';

class Login extends Component{

constructor(props,context) {
    super(props,context);
    this.state = {
        email: '',
        password: ''
    }

}

emailChangeHandler = (event) => {
   this.setState({
       ...this.state,
       email : event.target.value
       }

   )
}

passwordChangeHandler = (event) => {
        this.setState({
                ...this.state,
                password : event.target.value
            }

        )
    }

login = (event) => {
    event.preventDefault();
    axios.post('/users/login',this.state).then(response => {
        this.props.loggedIn(response.data.userId);
        this.props.history.push("/")
    }).catch(error => {

        this.setState(error => {
            this.setState({...this.state , failed: true})

        });

        setTimeout(() => {
            this.setState( { ...this.state,failed: false})
        }, 2000)

    })

}




    render() {

        return(
    <div className='container size mt-5'>
        { this.state.failed &&  <div className="alert alert-danger" role="alert">
            Please Check the Credentials and Try again
        </div>}

            <form onSubmit={this.login}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={this.emailChangeHandler} value = {this.state.email}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" onChange={this.passwordChangeHandler} value={this.state.value} className="form-control" id="exampleInputPassword1"/>
                </div>
                <button disabled={this.state.email.length === 0 || this.state.password.length === 0 } type="submit" className="btn btn-primary">Login</button>
            </form>
    </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        auth : state.auth
    }
}

const mapDispatchToProps = dispatch => {
 return {
     loggedIn : (userId) => dispatch({type : 'LoggedIn' , userId : userId})
 }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);
