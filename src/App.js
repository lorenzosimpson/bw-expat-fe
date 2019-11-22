import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import { Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'

function App() {
  return (
    <div className="App">
      <h1>expat journal</h1>
      <Route exact path='/login' component={Login} />
      <PrivateRoute exact path='/profile' component={Profile} />
    </div>
  );
}

export default App;
