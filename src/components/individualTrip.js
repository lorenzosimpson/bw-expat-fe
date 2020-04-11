import React, {useState, useEffect} from 'react';
import TripThumb from './TripThumb';
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
    const {trip_title, trip_desc, city, country, comments} = trip;
    
    if (!trip.comments) {
        return <h1>loading...</h1>
    }

    return (
        <div className='individual-container'>
            <div className='trip-container'>
                <TripThumb id={id} 
                trip_title={trip_title}
                trip_desc={trip_desc}
                city={city}
                country={country}
                />
                
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

            <div className='comments'>
                {comments.map(c => (
                    <>
                    <p>{c.commenter_name}</p>
                        <p>{c.comment}</p>
                        </>
                    ))}
                </div>
            
            </div>
        </div>
    );
}

export default IndividualTrip;