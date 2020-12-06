import React ,{Component} from 'react';
import {Route,Link,Switch,Redirect} from 'react-router-dom'
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import {connect} from 'react-redux';
import CreatePost from "../CreatePost/CreatePost";
import Posts from "../Posts/Posts";
import UserProfile from "../UserProfile/userProfile";
import Connect from '../Connect/connect'
import {withRouter} from 'react-router-dom';
import ViewProfile from "../ViewProfile/ViewProfile";
import Home from '../Home/Home';
import Read from '../Read/Read'
class NavBar extends Component {


    constructor(props) {
        super(props);

        // console.log(this.props)
        if (!this.props.auth.isAuthenticated) {
            //    check for the item in local storage
            let userId = localStorage.getItem('userId');
            if ((userId)) {

                this.props.loggedIn(parseInt(userId));
            }
        }


    }


    render() {
        const { isAuthenticated } = this.props.auth;
        const {location} = this.props;
        const login = (location.pathname === '/login');
        return (
            <div>
                <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
                    <Link className="navbar-brand" to = { '/' }>{isAuthenticated? 'Home':'Expressy'}</Link>
                    <ul className="navbar-nav ml-auto">
                        {!isAuthenticated && !login && <li className="nav-item">
                            <Link className="nav-link"  to={{pathname : '/login'}}>Login</Link>
                        </li>}

                        {!isAuthenticated && login && <li className="nav-item">
                            <Link className="nav-link"  to={{pathname : '/'}}>Signup</Link>
                        </li>}

                        {isAuthenticated &&  <li className="nav-item">
                                <Link className="nav-link" to={{pathname : '/createPost'}}>CreatePost</Link>
                        </li> }

                        {isAuthenticated  && <li>
                            <Link className="nav-link" to={{pathname : '/connect'}}>Connect</Link>
                        </li>}

                        {isAuthenticated &&  <li className="nav-item">
                            <Link className="nav-link" to={{pathname : '/profile'}}>Profile</Link>
                        </li> }

                        {isAuthenticated  && <li>
                            <Link className="nav-link" onClick={this.props.logout} to={{pathname : '/login'}}>Logout</Link>
                            </li>}


                    </ul>

                </nav>
                <Switch>
                    <Route path = {'/login'} exact component = {Login}></Route>
                    //TODO : Change to Home component once done with home component
                    {isAuthenticated ? <Route path = {'/signup'} exact component={Signup}></Route> : <Route path = {'/'} exact component={Signup}></Route>}
                    {isAuthenticated ? <Route path={'/createPost'} exact component={CreatePost}></Route> : null}
                    {isAuthenticated ? <Route path={'/profile'}  exact component={UserProfile}></Route> : null }
                    {isAuthenticated ? <Route path={'/connect'}  exact component={Connect}></Route> : null}
                    {isAuthenticated ? <Route path={'/viewProfile/:id'} exact component={ViewProfile} ></Route> :null }
                    {isAuthenticated ? <Route path={'/'} exact component={Home} ></Route> :null}
                    {isAuthenticated ? <Route path={'/read/:id'} exact component={Read} ></Route> :null}


                </Switch>
            </div>)
    }
}


const mapStateToProps = (state) => {
    return {
        auth : state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout : () => dispatch({type : 'Logout'}),
        loggedIn : (userId) => dispatch({type : 'LoggedIn' , userId : userId})

    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavBar));
