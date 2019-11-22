import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import * as Yup from 'yup';

const AddTrip = (props) => {
    const user_id = props.match.params.id
    return (
        <Formik 

            initialValues={{
                user_id: user_id,
                country: '',
                city: '',
                trip_title: '',
                trip_desc: '',
            }}
            onSubmit={fields => {
               
                    axios.post(`https://bw-expat-journal-ls.herokuapp.com/api/trips`, fields)
                    .then(res => {
                        console.log(res)
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