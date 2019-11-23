import React from 'react'
import axiosWithAuth from '../utils/axiosWithAuth';
import {Formik, Form, Field } from 'formik';
import {FormGroup, Button} from 'reactstrap';
import * as Yup from 'yup'

const AddPhoto = props => {
    const id = props.match.params.id
    const user_id = localStorage.getItem('id')
    console.log(user_id, 'user', id, 'trip')
    return (
        <Formik 
            initialValues={{
                trip_id: parseInt(id),
                img_url: '',
                img_caption: '',
                user_id: parseInt(user_id),
            }}
            validationSchema={Yup.object().shape({
                img_url: Yup.string()
                    .required('URL is required'),
            })}
            onSubmit={async fields => {
                console.log(fields)
                try {
                    let posted = await axiosWithAuth().post(`/photos`, fields)
                    props.history.push(`/profile/${user_id}`)
                } catch(err) {
                    console.log(err)
                }
            }}




            render={({ errors, touched }) => (
                <Form>
                    <FormGroup>
                        <Field type='text' name='img_url' placeholder='Image URL'/>
                        {touched.img_url && errors.img_url && ( <p className="error">{errors.img_url}</p> )}
                    </FormGroup>

                    <FormGroup>
                        <Field type='text' name='img_caption' placeholder='Image caption'/>
                    </FormGroup>
                    <Button type='submit'>Add Photo</Button>
                </Form>
              )}
        
        />
    )
}
export default AddPhoto;