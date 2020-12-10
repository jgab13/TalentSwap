import React from "react";

import "./styles.css";
import AuthSystem from "./../AuthSystem"
import messageImg from "./message.png";
import logoImg from "./logo.png";
import SearchBox from "./../SearchBox";
import {UserContext} from "./../../react-contexts/user-context";

import { Redirect, withRouter } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';

import { checkSession } from "./../../actions/user";

/* The Header Component */
class Header extends React.Component {
	static contextType = UserContext;
	constructor(props) {
		super(props);
		checkSession(this);

		this.state = {
			currentUser: null,
			showPopup: false,
			redirectURL: ""
		};

		this.logout = this.logout.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this);
	}

  renderRedirect() {
	  if (this.state.redirectURL) {
		  return (<Redirect to={this.state.redirectURL} />)
	  }
  }

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	logout() {
		this.context.logout();
		this.setState({
			currentUser: null,
			redirectURL: "/"
		});
	}

  render() {
    return (
      <div>
		{this.renderRedirect()}
        <Navbar bg="light">
		    <Navbar.Brand href="/">
		      <img
		        alt=""
		        src={logoImg}
		        width="30"
		        height="30"
		        className="d-inline-block align-top"
		      />{' '}
		      Talent Swap
		    </Navbar.Brand>
		  <SearchBox />
	      {this.state.currentUser ? 
	      <Nav className="ml-auto">
			  <NavDropdown title="Teach" id="basic-nav-dropdown" variant="success">
		        <NavDropdown.Item href="/CourseCreation">Create a New Course</NavDropdown.Item>
		        <NavDropdown.Item href="/PersonalCourses/tp">View Past Courses</NavDropdown.Item>
		        <NavDropdown.Item href="/PersonalCourses/tf">View Upcoming Courses</NavDropdown.Item>
		      </NavDropdown>
		      <NavDropdown title="Learn" id="basic-nav-dropdown">
		        <NavDropdown.Item href="/PersonalCourses/sp">View Past Courses</NavDropdown.Item>
		        <NavDropdown.Item href="/PersonalCourses/sf">View Upcoming Courses</NavDropdown.Item>
		      </NavDropdown>
		      <NavDropdown title={this.state.currentUser} id="basic-nav-dropdown">
		        <NavDropdown.Item onClick={() => this.setState({redirectURL: "/UserDashboard"})}>Profile</NavDropdown.Item>
		        <NavDropdown.Item onClick={this.logout}>Log Out</NavDropdown.Item>
		      </NavDropdown>
			  <img alt="message icon" src={messageImg} className="message-icon" onClick={() => this.setState({redirectURL: "/MessageCenter"})} />
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
