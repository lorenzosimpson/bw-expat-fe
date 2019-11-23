import React, {useState, useEffect} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Form, FormGroup, Button, Input } from 'reactstrap';

const EditTrip = props => {
    const id = props.match.params.id
    const user_id = localStorage.getItem('id')
    const [trip, setTrip] = useState({
        trip_title: ""
    })

    useEffect(() => { 
        axiosWithAuth()
        .get(`trips/${id}`)
        .then(res => setTrip(res.data))
    }, [id])

    const handleChange = e => {
        setTrip({
            ...trip,
            [e.target.name]: e.target.value,
        })
    }



    const handleSubmit = e => {
        e.preventDefault()
        delete trip.photos
        console.log(trip)
        axiosWithAuth()
        .put(`/trips/${id}`, trip)
        .then(res => {
            console.log(res)
            props.history.push(`/profile/${user_id}`)
            axiosWithAuth()
                .get(`/users/${user_id}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return (
       
            <Form onChange={handleChange} onSubmit={handleSubmit}>
                <FormGroup>
                    <Input name='country' type='text' placeholder='Country' value={trip.country}></Input>
                </FormGroup>

                <FormGroup>
                    <Input name='city' type='text' placeholder='City' value={trip.city} ></Input>
                </FormGroup>

                <FormGroup>
                    <Input name='trip_title' type='text' placeholder='Trip Title' value={trip.trip_title}></Input>
                </FormGroup>

                <FormGroup>
                    <Input name='trip_desc' type='text' placeholder='Trip Description' value={trip.trip_desc}></Input>
                </FormGroup>
                <Button type="submit" color="primary" size="lg">Edit</Button>{' '}
            </Form>
    )
    
}

export default EditTrip