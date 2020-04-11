import React, {useState, useEffect, useContext} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Form, FormGroup, Button, Input } from 'reactstrap';
import { SessionContext } from '../utils/SessionContext';

const EditTrip = props => {
    const id = props.match.params.id
    const user_id = localStorage.getItem('user_id')
    const [trip, setTrip] = useState({
        trip_title: ""
    })
    const [changes, setChanges] = useState({})

    useEffect(() => { 
        axiosWithAuth()
        .get(`trips/${id}`)
        .then(res => setTrip(res.data))
    }, [id])

    const handleChange = e => {
        setChanges({
            ...changes,
            [e.target.name]: e.target.value,
        })
    }



    const handleSubmit = e => {
        e.preventDefault()
        delete trip.photos
        axiosWithAuth()
        .put(`/trips/${id}`, changes)
        .then(res => {
            console.log(res)
            props.history.push(`/profile/${user_id}`)
            axiosWithAuth()
                .get(`/users/${user_id}`)
                .then(res => null)
                .catch(err => console.log(err))
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return (
       
            <Form onChange={handleChange} onSubmit={handleSubmit}>
                <FormGroup>
                    <Input name='country' type='text' placeholder={trip.country}></Input>
                </FormGroup>

                <FormGroup>
                    <Input name='city' type='text' placeholder={trip.city} ></Input>
                </FormGroup>

                <FormGroup>
                    <Input name='trip_title' type='text' placeholder={trip.trip_title}></Input>
                </FormGroup>

                <FormGroup>
                    <Input name='trip_desc' type='text' placeholder={trip.trip_desc}></Input>
                </FormGroup>
                <Button type="submit" color="primary" size="lg">Edit</Button>{' '}
            </Form>
    )
    
}

export default EditTrip