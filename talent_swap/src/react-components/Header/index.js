import React from "react";

import "./styles.css";
import AuthSystem from "./../AuthSystem"
import messageImg from "./message.png";

import { Redirect, withRouter } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown, Form, FormControl } from 'react-bootstrap';

/* The Header Component */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    showPopup: false,
	  loginStatus: this.props.loginStatus === false ? false : true,
	  redirectURL: ""
    };
    this.logout = this.logout.bind(this);
	this.togglePopup = this.togglePopup.bind(this);
	this.renderRedirect = this.renderRedirect.bind(this);
  }

  renderRedirect() {
	  if (this.state.redirectURL) {
	  	if (this.state.redirectURL === "/") {
	  		return <Redirect to=
		      {{
		        pathname: '/',
		        state: {loginStatus: false}
		      }} />
	  	}
		  return (
			<Redirect to={this.state.redirectURL} />
		  )
	  }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  logout() {
  	this.setState({
      loginStatus: false,
      redirectURL: "/"
    });
  }

  render() {
    return (
      <div>
		{this.renderRedirect()}
		{console.log(this.props.loginStatus)}
        <Navbar bg="light">
		  <Navbar.Brand href="./">LOGO</Navbar.Brand>
		  <Form inline className='search-box'>
	        <FormControl type="text" placeholder="search" className="mr-sm-2" />
	        <Button variant="outline-success" href="/Course">search</Button>
	      </Form>
	      {this.state.loginStatus ? 
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
		      <NavDropdown title="User" id="basic-nav-dropdown">
		        <NavDropdown.Item href="/UserDashboard">Profile</NavDropdown.Item>
		        <NavDropdown.Item onClick={this.logout}>Log Out</NavDropdown.Item>
		      </NavDropdown>
			  <img src={messageImg} className="message-icon" onClick={() => this.setState({redirectURL: "/MessageCenter"})} />
		      </Nav>
		      :
		      <Nav className="ml-auto">
		      <Button variant="success" onClick={this.togglePopup}>Join Now</Button>
		  	</Nav>
		  }
		  
		</Navbar>
		{this.state.showPopup ? <AuthSystem/> : null}
      </div>
    );
  }
}

export default withRouter(Header);
