import React from "react";

import "./styles.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";


/* The Header Component */
class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light">
		  <Navbar.Brand href="./">LOGO</Navbar.Brand>
		  <Form inline>
	        <FormControl type="text" placeholder="search" className="mr-sm-2" />
	        <Button variant="outline-success" href="/Course">search</Button>
	      </Form>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="mr-auto">
			  <NavDropdown title="Teach" id="basic-nav-dropdown" variant="success">
		        <NavDropdown.Item href="/CourseCreation">Create a New Course</NavDropdown.Item>
		        <NavDropdown.Item href="/Course">View Past Courses</NavDropdown.Item>
		        <NavDropdown.Item href="/Course">View Upcoming Courses</NavDropdown.Item>
		      </NavDropdown>
		      <NavDropdown title="Learn" id="basic-nav-dropdown">
		        <NavDropdown.Item href="#action/3.1">Find a Course</NavDropdown.Item>
		        <NavDropdown.Item href="/Course">View Past Courses</NavDropdown.Item>
		        <NavDropdown.Item href="/Course">View Upcoming Courses</NavDropdown.Item>
		      </NavDropdown>
		      <Button variant="outline-success">Message</Button>
		      <Button variant="outline-success">User</Button>
		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
      </div>
    );
  }
}

export default Header;
