import React, { useState, useContext } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { SessionContext } from '../utils/SessionContext';
function CommentForm(props) {
    const [comment, setComment] = useState('')
    const {trip_id} = props;
    const user_id = localStorage.getItem('user_id')
    const { username } = useContext(SessionContext)
    const { setTrip } = props;


    function handleChange(e) {
        setComment(e.target.value)
        console.log(comment)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const request = {
            comment: comment,
            trip_id: trip_id,
            user_id: user_id,
            commenter_name: username,
        }
        console.log(request)
        axiosWithAuth()
        .post('/comments/new', request)
        .then(res => {
            console.log(res)
            axiosWithAuth().get(`/trips/${trip_id}`)
            .then(res => setTrip(res.data))
            .catch(err => console.log(err))
        document.getElementById('textarea').value = '';
        })
        .catch(err => console.log(err))
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <textarea id='textarea' placeholder='Share your thoughts'></textarea>
            <button>Add Comment</button>
        </form>
    );
}

export default CommentForm;