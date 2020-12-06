import React from 'react'
import styles from '../Styles.css'
import placeholder from '../Images/palceholder.png'
import {withRouter} from "react-router-dom";

const Profile = props => {
  console.log(props)
    let viewProfile = <div><button type="button" className="btn btn-warning">
            Followers <span className="badge badge-light">{props.userDetails.followers}</span>
        </button>
            <button type="button" className="btn btn-primary ml-1">
                Following <span className="badge badge-light">{props.userDetails.followed}</span>
            </button>
        </div>





    return (<div className='d-flex justify-content-center container'>
        <div  style={{height: '300px'}} className='jumbotron  jumbotron-cu d-inline-flex p-0 mt-3 border-primary'>
            <img src={placeholder} alt='...' className=" border image-profile border-secondary rounded-circle"/>
            <div className='userName ml-2'> <span className='display-4 '>{props.userDetails.username}</span>
            <p className='ml-1'>Here we Place Data About YOu And You can write about your life</p>
                {viewProfile}


            </div>

        </div>
    </div>)
}


export default withRouter(Profile);
