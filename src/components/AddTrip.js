import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import { FormGroup, Button } from 'reactstrap';
// import * as Yup from 'yup';

import axiosWithAuth from '../utils/axiosWithAuth'

const AddTrip = (props) => {
    const user_id = localStorage.getItem('user_id')
    return (
        <Formik 

            initialValues={{
                user_id: Number(user_id),
                country: '',
                city: '',
                trip_title: '',
                trip_desc: '',
            }}
            onSubmit={fields => {
                    console.log(fields)
                    axiosWithAuth().post(`/trips`, fields)
                    .then(res => {
                        console.log(res)
                        props.history.push(`/profile/${user_id}`)
                        axios.get(`https://bw-expat-journal-ls.herokuapp.com/api/users/${user_id}/trips`)
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            }}
        
            render={({ errors, touched }) => (
                <Form>
                    <FormGroup>
                        <Field name='country' placeholder='Country'></Field>
                    </FormGroup>

                    <FormGroup>
                        <Field name='city' placeholder='City'></Field>
                    </FormGroup>

                    <FormGroup>
                        <Field name='trip_title' placeholder='Trip Title'></Field>
                    </FormGroup>

                    <FormGroup>
                        <Field name='trip_desc' placeholder='Trip Description'></Field>
                    </FormGroup>
                    <Button type="submit" color="primary" size="lg">Add</Button>{' '}
                </Form>
            )}
        
        />
    )
}

export default AddTrip;