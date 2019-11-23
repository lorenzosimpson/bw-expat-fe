import React from 'react';
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
import PrivateRoute from './utils/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/profile/:id' component={Profile} />
      <PrivateRoute exact path='/profile/:id/newtrip' component={AddTrip} />
      <PrivateRoute exact path='/edit/:id' component={EditTrip} />
      <PrivateRoute exact path='/addphoto/:id' component={AddPhoto} />
    </div>
  );
}

export default App;
