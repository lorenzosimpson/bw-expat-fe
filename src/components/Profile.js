import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import TripThumb from './TripThumb';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Button } from 'reactstrap';

const Profile = (props) => {
    const [trips, setTrips] = useState([])
    const [user, setUser] = useState({})
    const id = localStorage.getItem('id')

    useEffect(() => {
        axiosWithAuth().get(`https://bw-expat-journal-ls.herokuapp.com/api/users/${id}/`)
        .then(res => {
            console.log(res)
            setUser(res.data)
        })
        .catch(err => console.log(err))
    }, [id])


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
            <h1>Welcome, {user.first_name}</h1>
            <NavLink to={`/profile/${id}/newtrip`} >    
            <Button id='block-btn' outline color="primary" size="lg" block>New trip + </Button>
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
                      <Button 
                      outline color="info"
                      onClick={()=> {
                        props.history.push(`/edit/${t.id}`)
                    }}>edit</Button>
                    
                    <Button  
                    outline color="info"
                    onClick={() => props.history.push(`/addphoto/${t.id}`)}
                    >add photo</Button>

                    <Button 
                    outline color="danger"
                    onClick={() => {
                        axiosWithAuth()
                        .delete(`/trips/${t.id}`)
                        .then(res => {
                            console.log(res)
                            axios.get(`https://bw-expat-journal-ls.herokuapp.com/api/users/${id}/trips`)
                            .then(res => {
                                console.log(res)
                                setTrips(res.data)
                            })
                            .catch(err => {
                                console.log(err)
                                setTrips([])
                            })
                        })
                    }}>x</Button>
                    </>
                )) :
                <p>No trips yet!</p>
            }




        </div>
    )
}

export default Profile;