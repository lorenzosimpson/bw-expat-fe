import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import TripThumb from './TripThumb';
import axiosWithAuth from '../utils/axiosWithAuth';

const Profile = (props) => {
    const [trips, setTrips] = useState([])
    const id = props.match.params.id

    useEffect(() => {
        axios.get(`https://bw-expat-journal-ls.herokuapp.com/api/users/${id}/trips`)
        .then(res => {
            console.log(res)
            setTrips(res.data)
        })
        .catch(err => console.log(err))
    }, [id])

    


console.log(id, 'id')
console.log(trips)

    return (
        <div className='profile'>
            <NavLink to={`/profile/${id}/newtrip`} >    
              <button>new trip</button>
            </NavLink>
            
            {trips.length ? 
                trips.map(t => (
                    <>
                    <TripThumb id={t.id} 
                    trip_title={t.trip_title}
                    trip_desc={t.trip_desc}
                    city={t.city}
                    country={t.country}
                      />
                      <button onClick={()=> {
                        props.history.push(`/edit/${t.id}`)
                    }}>edit</button>
                    <button onClick={() => {
                        axiosWithAuth()
                        .delete(`/trips/${t.id}`)
                        .then(res => {
                            console.log(res)
                            axios.get(`https://bw-expat-journal-ls.herokuapp.com/api/users/${id}/trips`)
                            .then(res => {
                                console.log(res)
                                setTrips(res.data)
                            })
                            .catch(err => console.log(err))
                        })
                    }}>x</button>
                    </>
                )) :
                <p>No trips yet!</p>
            }




        </div>
    )
}

export default Profile;