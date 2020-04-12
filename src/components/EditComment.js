import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

function EditComment(props) {
    const {comment} = props;
    const [newComment, setNewComment] = useState(comment.comment)
    console.log(props)

    function handleChange(e) {
        setNewComment(
           e.target.value
        )
        console.log(newComment)
    }
    function handleSubmit(e) {
        e.preventDefault()
        const req = {
            comment: newComment
        }
        axiosWithAuth()
        .put(`/comments/edit/${comment.id}`, req)
        .then(res => {
            console.log(res)
            props.setEditing(false)
            axiosWithAuth()
            .get(`/trips/${comment.trip_id}`)
            .then(res => {
                console.log(res)
                props.setTrip(res.data)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='edit-comment'>
            <input name='new-comment' onChange={handleChange} value={newComment}>
            </input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default EditComment;