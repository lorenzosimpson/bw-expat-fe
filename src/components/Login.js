import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const Login = (props) => {

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
                   let res = await axios.post(`https://bw-expat-journal-ls.herokuapp.com/api/users/login`, fields)
                        localStorage.setItem('token', res.data.token)
                        props.history.push('/profile')
                        console.log(res, 'response')
                } catch(err) {
                        if (err.toString().includes('401') ) {
                            window.alert('Please check login credentials and try again.')
                        }
                }
                
            }}
            render={({ errors, status, touched}) => (
                <Form>
                    <FormGroup>
                            <Field type="text" name="username" id="exampleEmail" placeholder="username" 
                            />
                              {touched.username && errors.username && ( <p className="error">{errors.username}</p> )}
                            
                    </FormGroup>

                    <FormGroup>
                            <Field type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                            {touched.password && errors.password && ( <p className="error">{errors.password}</p> )}
                    </FormGroup>
                    <Button type="submit" color="primary" size="lg">Log in</Button>{' '}
                </Form>
            )}
        />
    )
}

export default Login;