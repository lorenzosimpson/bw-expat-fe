import React, { useState, useEffect } from 'react';
import './sass/App.scss';
import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import AddTrip from './components/AddTrip'
import EditTrip from './components/EditTrip';
import AddPhoto from './components/AddPhoto'
import { Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { SessionContext } from './utils/SessionContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import individualTrip from './components/individualTrip';
import axiosWithAuth from './utils/axiosWithAuth';

function App() {
  

  const [loggedIn, setLoggedIn] = useState(false)
  const [loginUser, setLoginUser] = useState({})
  const [userId, setUserId] = useState(Number)
  const [username, setUsername] = useState('')


  return (
    <SessionContext.Provider value={{loggedIn, setLoggedIn, loginUser, setLoginUser, userId, setUserId, username, setUsername}}>
    <div className="App">
      <Route path='/' component={Navigation} />
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/trips/:id' component={individualTrip} />
      <Route exact path='/profile/:id' component={Profile} />
      <PrivateRoute exact path='/profile/:id/newtrip' component={AddTrip} />
      <PrivateRoute exact path='/edit/:id' component={EditTrip} />
      <PrivateRoute exact path='/addphoto/:id' component={AddPhoto} />
    </div>
    </SessionContext.Provider>
  );
}

export default App;
