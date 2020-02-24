import React, {useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import TripThumb from './TripThumb';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Button } from 'reactstrap';
import { SessionContext } from '../utils/SessionContext';
import ProfileGrid from './ProfileGrid';

const Profile = (props) => {
    const [trips, setTrips] = useState([])
    const [user, setUser] = useState({})
    const id = localStorage.getItem('user_id')
    const [grid, setGrid] = useState(true)

    useEffect(() => {
        axiosWithAuth().get(`https://bw-expat-journal-ls.herokuapp.com/api/users/${id}/`)
        .then(res => {
            setUser(res.data)
        })
        .catch(err => console.log(err))
    }, [id])


    useEffect(() => {
        axios.get(`https://bw-expat-journal-ls.herokuapp.com/api/users/${id}/trips`)
        .then(res => {
            setTrips(res.data)
        })
        .catch(err => console.log(err))
    }, [id])

    

    return (
        <div className='profile'>

            <section className='profile-info'>
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXMzMz////JycnNzc3X19f8/Pzh4eHU1NTv7+/l5eX6+vr09PTs7Ozb29vQ0NDz8/OUjODvAAAFDklEQVR4nO2dAZaqMAxFMRUQFWb/u/3I8BUUHKEv9AVzV+A9aZO0tDXLHMdxHMdxHMdxHMdxHMdxrCAiqX+CBqEzEwllXRRFk/rn4GnDVhbXU374JU/9e6DcBmV9PR+GnHYzTlu7NnRju5brPgS70F2e5doReqj2INimlGLCrqOwLhg6vZ8ZvcPhR0LqnxiJNNVc9PYQQpH6rV5LZTmGIkX+h19LY1UxiFQf+LXJ9Gh0nErxiV6HyXoo9Ufx6zmX1hyl+Su/GA+jVAv9bmFsDDmGl8bzI2obiiFIucrvcKuMmYG6EaReK2hkEbWgRkxwTv3z/yZO0MBiP1awVWyo52LMHLxDLbg6iw7JM958I0satXl4041cIYK3VX9qlWnkCBI8sG5NgcZoxzG1zBRruu15GIOIDCHnOEWUwgF8VVFOWEPCIGIFDzmdIaSdGVKmNnoGPA3ptsJDFr2oeIZsIgZYx3aHrXXDG57dcGM0DLmKvsdwBW64MV9gCG68CQ2Xfk2zZhiw619Cw0zggnSG+4/h/g3hgnSG+4/huk/3lgz3H0O4IJlh2L0hfLuUz7BxQ/OG8C1vN9wcN3RDN0zP/g33Xw8V+lKuzxZuuAayu8HBDZeTWmmEyPwFyl0Yhh/8Lg3VPSGFrzIdPNe9FPJoD0uy0TOsU6v1KOyV9rCc/NKahzyn9zRKxS8kIdT4hu+GG/MFhvCzpT08J6Fxl2XG8BxtU9jC6OA5RKtV8nl6b4VP3B1FarE7WiWfpaVROZjYwbK00CsXNNNQK5nyFAutZMqTStG3K/9DdZFUYTORapDqBJGnGnbgiz5XCDOFdMpT7nu+4JYs9IplzlTt7yANiRZOD7C5hmWndAi2YPA03QOgE5EwhNi+hvPRL+REJKwVGbYi0pX7DuBKn2ejdARwpc85SJFn2zgHKXClT7es6MG9HFGlVpkhwIYpzRmMF0AVkXWQ3sA0biwnMCYIkCAyLpzuQJ7d452FNwCd24VaEFETWav9ndg9N6at/GkipyJpzz0irgE38Wp51BdhC4JRh0+oa+GDiPaUP8907N8wYpTaMIxJpkYMIza/jRhGVAvOneBnYlrT/RuybiOOibl+wboHNSbK0EQMYz4G2zCM+cpmY5TGLBDJTglNE7U+ZPx8/0LU3r6JeRi1ALZgGPcKpgFDidumYf6foA4pq8hj+zl3roF85+b9L6QMdf+JeFsfdVuW6nz3CNShKN6EijrYRruVATtPQ7stDDt+Sft1Bnctn+x1oQcoQdajCsBjbaQVEXm8lLMiIi90UwYRe1OWMYjYW0GEe9/oy2t8hui3oMl6U5GV/xf/BqaVsEitcR//XNDsaFRqz0Sd0h/iEymVHhvouaQNpGSF0oMYQ061JJKUUu1poSfyKkUg5aj2wNcU13LbQLbDU+2Jtjm2TK3S6GaXWX42mZFt8ds8fA/yQtUxhEyCXvH7kGujKJlseI65KA1W2Th7vkOjfKSdfhOAGzppVN6fiQM4WLdrXhaSVwHhKEeu4TnmGu3INv1euUZNSKk3WDtE007IbN13AO7xOWRV0qErD++5VchF/+MtUqTuzhazILEGvUdldfm40zEYv/98FEc5Wsifs/wZRykt5ZdJ3m0lhyyQ9meLOM/fYTSaYF6ZcZRgfoA+ODevbc5uAthzfAnjjgL4y1PG0XpzPCWjyaj3LyMpGRpqPYyflqMbmscN7eOG9nFD+3yL4T9Z4FjO6WslwAAAAABJRU5ErkJggg=='></img>
                <div className='profile-headers'>
                    {
                        user.first_name && user.last_name ? (
                            <>
                            <h1>{`${user.first_name} ${user.last_name}`}</h1>
                            <p>{user.username}</p>
                            </>
                        ) : (
                            <h1>{user.username}</h1>
                        )
                    }
                   
                </div>
                  
            </section>
            
            <NavLink to={`/profile/${id}/newtrip`} > 
            <container className='btn-container'>
                <Button id='block-btn' outline color="secondary" size="lg" block>New trip + </Button>
            </container>   
            
            </NavLink>
            <span style={{
                display: 'flex'
                }}>
                <p>View as </p> <div style={{marginLeft: '5px'}} onClick={() => setGrid(!grid)}>{
                    grid ?
                    <i class="material-icons">
                        grid_on
                    </i> : 
                    <i class="material-icons">
                        format_list_bulleted
                    </i>}
                    </div>
            </span>
                
            {!grid ? 
                trips.map(t => (
                    <div className='trip-container'>
                    <TripThumb id={t.id} 
                    trip_title={t.trip_title}
                    trip_desc={t.trip_desc}
                    city={t.city}
                    country={t.country}
                      />
                    
                    <i onClick={()=> {
                        props.history.push(`/edit/${t.id}`)
                    }} class="material-icons">
                    edit
                    </i>


                <i class="material-icons"
                    onClick={() => {
                        axiosWithAuth()
                        .delete(`/trips/${t.id}`)
                        .then(res => {
                            console.log(res)
                            axios.get(`https://bw-expat-journal-ls.herokuapp.com/api/users/${id}/trips`)
                            .then(res => {
                                console.log(res)
                                setTrips(res.data)
                            })
                            .catch(err => {
                                console.log(err)
                                setTrips([])
                            })
                        })
                    }}>delete</i>
                    
                    </div>
                )) : (
                    <div className='trip-container'>
                        <div className='grid-card-container'>
                    {trips.map(t => (
                        <ProfileGrid 
                            id={t.id} 
                            trip_title={t.trip_title}
                            trip_desc={t.trip_desc}
                            city={t.city}
                            country={t.country}
                            />
                    ))}
                        </div>
                    </div>
                )
            }




        </div>
    )
}

export default Profile;