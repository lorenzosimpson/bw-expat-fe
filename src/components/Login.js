import React, { useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FormGroup, Button } from 'reactstrap';
import { SessionContext } from '../utils/SessionContext';

const Login = (props) => {
    const { loggedIn, setLoggedIn } = useContext(SessionContext)
   
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
            onSubmit={fields => { 
                axios.post(`https://bw-expat-journal-ls.herokuapp.com/api/users/login`, fields)
                .then(res => {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('user_id', res.data.id)
                        setLoggedIn(true)
                        props.history.push(`/profile/${localStorage.getItem('user_id')}`)
                       

                }).catch(err => {
                    console.log(err)
                        if (err.toString().includes('401') ) {
                            window.alert('Please check login credentials and try again.')
                        } else {
                            window.alert('An error occurred, please try again later.')
                        }
                }
                )
                
            }}
            render={({ errors, touched}) => (
                <Form>
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

export default Login;