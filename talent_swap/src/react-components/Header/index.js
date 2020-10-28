import React from "react";

import "./styles.css";
import AuthSystem from "./../AuthSystem"

import { Navbar, Nav, Button, NavDropdown, Form, FormControl } from 'react-bootstrap';

/* The Header Component */
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div>
        <Navbar bg="light">
		  <Navbar.Brand href="./">LOGO</Navbar.Brand>
		  <Form inline className='search-box'>
	        <FormControl type="text" placeholder="search" className="mr-sm-2" />
	        <Button variant="outline-success" href="/Course">search</Button>
	      </Form>
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="ml-auto">
			  <NavDropdown title="Teach" id="basic-nav-dropdown" variant="success">
		        <NavDropdown.Item href="/CourseCreation">Create a New Course</NavDropdown.Item>
		        <NavDropdown.Item href="/CourseList">View Past Courses</NavDropdown.Item>
		        <NavDropdown.Item href="/CourseList">View Upcoming Courses</NavDropdown.Item>
		      </NavDropdown>
		      <NavDropdown title="Learn" id="basic-nav-dropdown">
		        <NavDropdown.Item href="/CourseList">Find a Course</NavDropdown.Item>
		        <NavDropdown.Item href="/CourseList">View Past Courses</NavDropdown.Item>
		        <NavDropdown.Item href="/CourseList">View Upcoming Courses</NavDropdown.Item>
		      </NavDropdown>
		      <Button variant="outline-success">Message</Button>
		      <NavDropdown title="User" id="basic-nav-dropdown">
		        <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
		        <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
		      </NavDropdown>
		      <Button variant="success" onClick={this.togglePopup.bind(this)}>Join Now</Button>
		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
		{this.state.showPopup ? <AuthSystem/> : null}
      </div>
    );
  }
}

export default Header;
