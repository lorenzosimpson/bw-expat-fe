import React, { useState, useContext } from 'react';
import { NavLink as RouteLink, Redirect, Route } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {useDarkMode} from '../hooks/useDarkMode';

import { SessionContext } from '../utils/SessionContext';

const Navigation = (props) => {
  const [darkMode, setDarkMode] = useDarkMode()
  const [isOpen, setIsOpen] = useState(false);
  const {loggedIn, setLoggedIn} = useContext(SessionContext);
  const user_id = localStorage.getItem('user_id')
  const token = localStorage.getItem('token')

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>

      <Navbar color={darkMode ? '#383838' : 'light'} light expand="md">
        <RouteLink to="/">
          <NavbarBrand id='expat-logo'>expatJournal</NavbarBrand>
        </RouteLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem onClick={toggle}>
              <RouteLink to='/register'>
                <NavLink>Register</NavLink>
              </RouteLink>
            </NavItem>
            <NavItem onClick={toggle}>
              <RouteLink to={localStorage.getItem('token')? `/profile/${user_id}` : '/login'}>
                <NavLink>Profile</NavLink>
              </RouteLink>
            </NavItem>
            {!token ? (
            <NavItem onClick={toggle}>
            <RouteLink to='/login'>
              <NavLink>Log in</NavLink>
            </RouteLink>
          </NavItem>
            ) :  ( 
            <NavItem onClick={toggle}>
            <div onClick={() => {
              if (token && window.confirm('Are you sure you want to log out?')) {
                props.history.push('/')
                localStorage.clear()
                setLoggedIn(false)
            }}
              } >
              <NavLink>Log out</NavLink>
            </div>
            </NavItem>
            )}
          </Nav>
          <div onClick={(() => setDarkMode(!darkMode))}>{darkMode ? '🌞' : '🌙'}</div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
