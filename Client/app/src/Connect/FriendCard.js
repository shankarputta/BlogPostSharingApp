import React from 'react';
import {Link} from "react-router-dom";
import './card.css'


const friendCard = (props) => {

    return (
        <div className='container mt-2'>
            <div className="card">
                <div className="card-body d-flex justify-content-between">
                    <div>
                    <h5 className="card-title">{props.username}</h5>
                    <p className="card-text">{props.description}</p>
                    </div>
                    <div>
                    <Link to={`/viewProfile/${props.id}`} className="btn btn-primary">View Profile</Link>
                    </div>
                </div>
            </div>
        </div>
        )

}

export default friendCard;
