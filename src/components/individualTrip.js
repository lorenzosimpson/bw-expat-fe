import React, {useState, useEffect} from 'react';
import CommentForm from './CommentForm';
import axiosWithAuth from '../utils/axiosWithAuth';
import EditComment from './EditComment';

function IndividualTrip(props) {
    const {id} = props.match.params;
    const [trip, setTrip] = useState({})
    const user_id = localStorage.getItem('user_id')
    const [commenter, setCommenter] = useState({})
    const [editing, setEditing] = useState(false)
   
    useEffect(() => {
        axiosWithAuth()
        .get(`/users/${user_id}`)
        .then(res => {
            console.log(res)
            setCommenter(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => { 
        axiosWithAuth()
        .get(`trips/${id}`)
        .then(res => setTrip(res.data))
    }, [id])


    console.log(trip)
    const {comments} = trip;
    
    if (!trip.comments) {
        return <h1>loading...</h1>
    }

    return (
        <div className='individual-container'>
            <img top width="100%" src={`https://source.unsplash.com/featured/1600x900?${trip.city}, city, skyline`} alt="Card image cap" />
                <div className='title-comments-container'>
                <div className='left-container'>
                    <h1>{trip.trip_title}</h1>
                    <h4>{`${trip.city}, ${trip.country}`}</h4>
                        <p>{trip.trip_desc}</p>
                   { 
                    parseInt(user_id) === trip.user_id && (
                   <>
                   <i onClick={()=> {
                        props.history.push(`/edit/${id}`)
                    }} class="material-icons">
                    edit
                    </i>

                    <i class="material-icons"
                    onClick={() => {
                        axiosWithAuth()
                        .delete(`/trips/${id}`)
                        .then(res => {
                            props.history.push('/profile/')
                        })
                    }}>delete</i>
                    </>
                    )
                }
                </div>
     
            <div className='right-container'>

                <div className='comments'>
                    <h3>Comments</h3>
                    {comments.map(c => (
                        <>
                            <h4>{c.commenter_name}</h4>
                            <p>{c.comment}</p>
                            { 
                    commenter.username === c.commenter_name && (
                   <>
                   <i onClick={()=> {
                       setEditing(true)
                    }} class="material-icons">
                    edit
                    </i>

                    {editing && (
                        <EditComment comment={c} setTrip={setTrip} setEditing={setEditing}/>
                    )}

                    <i class="material-icons"
                    onClick={() => {
                        axiosWithAuth()
                        .delete(`/trips/${id}`)
                        .then(res => {
                            props.history.push('/profile/')
                        })
                    }}>delete</i>
                    </>
                    )
                }
                        </>
                        ))}
                </div>
                
                <CommentForm trip_id={trip.id} setTrip={setTrip}/>

            </div>
            </div>

        </div>
    );
}

export default IndividualTrip;