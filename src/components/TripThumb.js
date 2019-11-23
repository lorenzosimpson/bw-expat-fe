import React from 'react';

const TripThumb = props => {

    return (
        <div className='trip-thumbnail'>
            <h4>{props.trip_title}</h4>
            <p>{props.trip_desc}</p>
            <p>{props.city}</p>
            <p>{props.country}</p>
        </div>
    )
}

export default TripThumb;