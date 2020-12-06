import React from 'react'
import {Link} from "react-router-dom";

const Post = (props) =>{

    return (
    <div className='container d-flex justify-content-around'><div style={{'width': '50%'}} className=" card m-3">
       <div className="card-header d-flex justify-content-between"><span>Date:{props.Date}</span>{props.onDelete && <span><i onClick={()=>{props.onDelete(props.id)}} style={{cursor:'pointer'}} className="fas fa-trash"></i>
</span>}</div>


        <div className="card-body">
    <h5 className="card-title">{props.Title}</h5>
    <p >{props.Description.substr(0,500)}</p>
        {props.username &&   <span className="font-italic font-weight-bold">.....by {props.username}</span>}
     <div className='d-flex justify-content-between'>
     <div>
     <span className="btn btn-primary m-1"><i className="far fa-thumbs-up"></i></span>
        <span  className="btn btn-danger m-1"><i className="far fa-flip-horizontal fa-thumbs-down"></i></span>
     </div>
         <div>
         <Link to={'/read/'+props.id} className='btn btn-secondary'><i className="fab fa-readme"></i></Link>
     </div>

    </div>

    </div>
    </div>
    </div>





    )



}


export default Post;
