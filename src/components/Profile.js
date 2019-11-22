import React, {useState, useEffect } from 'react';
import axios from 'axios'

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
    }, [])

    
console.log(id, 'id')
console.log(trips)

    return (
        <div className='profile'>
            {trips.map(t => (
                <p>{t.trip_title}</p>
            ))}




        </div>
    )
}

export default Profile;