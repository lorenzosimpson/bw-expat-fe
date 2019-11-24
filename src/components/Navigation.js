import React, { useState } from 'react';
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

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <RouteLink to="/">
          <NavbarBrand id='expat-logo'>expatJournal</NavbarBrand>
        </RouteLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem onClick={toggle}>
              <RouteLink to='/login'>
                <NavLink>Log in</NavLink>
              </RouteLink>
            </NavItem>
            <NavItem onClick={toggle}>
              <RouteLink to='/register'>
                <NavLink>Register</NavLink>
              </RouteLink>
            </NavItem>
            <NavItem onClick={toggle}>
              <RouteLink to={localStorage.getItem('token')? `/profile/${localStorage.getItem('id')}` : '/login'}>
                <NavLink>Profile</NavLink>
              </RouteLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
             <NavItem onClick={toggle}>
              <div onClick={() => {
                if (localStorage.getItem('token') && window.confirm('Are you sure you want to log out?')) {
                  localStorage.clear();
                  props.history.push('/')
              }}
                } >
                <NavLink>Log out</NavLink>
              </div>
              </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
