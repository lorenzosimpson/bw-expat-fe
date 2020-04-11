import React, { useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FormGroup, Button } from 'reactstrap';
import { SessionContext } from '../utils/SessionContext';
import axiosWithAuth from '../utils/axiosWithAuth';

const Register = (props) => {

    const {loggedIn, setLoggedIn} = useContext(SessionContext);

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
                   let res = await axiosWithAuth().post(`/users/register`, fields)
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('user_id', res.data.id)
                        props.history.push(`/profile/${res.data.id}`)
                        setLoggedIn(true)
                } catch(err) {
                    console.log(err)
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
                    <Button type="submit" color="primary" size="lg">Register</Button>{' '}
                    <p id='rt-to-login' onClick={() => props.history.push('/login')}>Already have an account? Log in</p>
                </Form>
            )}
        />
    )
}

export default Register;