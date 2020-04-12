import React, {useState, useEffect} from 'react';
import CommentForm from './CommentForm';
import axiosWithAuth from '../utils/axiosWithAuth';

function IndividualTrip(props) {
    const {id} = props.match.params;
    const [trip, setTrip] = useState({})


    useEffect(() => { 
        axiosWithAuth()
        .get(`trips/${id}`)
        .then(res => setTrip(res.data))
    }, [id])


    console.log(trip)
    const {comments} = trip;
    
    if (!trip.comments) {
        return <h1>loading...</h1>
    }

    return (
        <div className='individual-container'>
            <img top width="100%" src={`https://source.unsplash.com/featured/1600x900?${trip.city}, city, skyline`} alt="Card image cap" />
                <div className='title-comments-container'>
                <div className='left-container'>
                    <h1>{trip.trip_title}</h1>
                    <h4>{`${trip.city}, ${trip.country}`}</h4>
                        <p>{trip.trip_desc}</p>
                    <i onClick={()=> {
                        props.history.push(`/edit/${id}`)
                    }} class="material-icons">
                    edit
                    </i>

                    <i class="material-icons"
                    onClick={() => {
                        axiosWithAuth()
                        .delete(`/trips/${id}`)
                        .then(res => {
                            props.history.push('/profile/')
                        })
                    }}>delete</i>
                </div>
        
     
            <div className='right-container'>

                <div className='comments'>
                    <h3>Comments</h3>
                    {comments.map(c => (
                        <>
                        <h4>{c.commenter_name}</h4>
                            <p>{c.comment}</p>
                            </>
                        ))}
                </div>
                
                <CommentForm trip_id={trip.id} setTrip={setTrip}/>

            </div>
            </div>

        </div>
    );
}

export default IndividualTrip;