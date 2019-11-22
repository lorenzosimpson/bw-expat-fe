import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FormGroup, Button } from 'reactstrap';

const Register = (props) => {

    return (
        <Formik 
            initialValues={{
                    username: "",
                    password: "",
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .required('Username is required'),
                password: Yup.string()
                    .required('Password is required'),
            })}
            onSubmit={async fields => { 
                try {
                   let res = await axios.post(`https://bw-expat-journal-ls.herokuapp.com/api/users/register`, fields)
                        localStorage.setItem('token', res.data.token)
                        props.history.push(`/profile/${res.data.id}`)
                        console.log(res, 'response')
                } catch(err) {
                            window.alert('An error occurred. Please try again later.')
                }
                
            }}
            render={({ errors, status, touched}) => (
                <Form>
                    <FormGroup>
                            <Field type="text" name="first_name" id="exampleEmail" placeholder="First Name" 
                            />
                    </FormGroup>

                    <FormGroup>
                            <Field type="text" name="last_name" id="exampleEmail" placeholder="Last Name" 
                            />
                    </FormGroup>

                    <FormGroup>
                            <Field type="text" name="username" id="exampleEmail" placeholder="username" 
                            />
                              {touched.username && errors.username && ( <p className="error">{errors.username}</p> )}
                            
                    </FormGroup>

                    <FormGroup>
                            <Field type="password" name="password" id="examplePassword" placeholder="password" />
                            {touched.password && errors.password && ( <p className="error">{errors.password}</p> )}
                    </FormGroup>
                    <Button type="submit" color="primary" size="lg">Log in</Button>{' '}
                </Form>
            )}
        />
    )
}

export default Register;