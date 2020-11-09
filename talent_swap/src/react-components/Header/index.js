import React from "react";

import "./styles.css";
import AuthSystem from "./../AuthSystem"
import messageImg from "./message.png";
import logoImg from "./logo.png";
import SearchBox from "./../SearchBox";

import { Redirect, withRouter } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';

/* The Header Component */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    showPopup: false,
	  loginStatus: this.props.loginStatus === false ? false : true, //should be fetched from cookies
	  redirectURL: ""
    };
    this.logout = this.logout.bind(this);
	this.togglePopup = this.togglePopup.bind(this);
	this.renderRedirect = this.renderRedirect.bind(this);
	// this.handleSearch = this.handleSearch.bind(this);
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
	  	if (this.state.redirectURL === "/Home") {
	  		return <Redirect to=
		      {{
		        pathname: '/',
		        state: {loginStatus: true}
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
//   handleSearch(input){
// 	  this.props.handleSearch(input);
//   }

  render() {
    return (
      <div>
		{this.renderRedirect()}
		{/* {console.log(this.props.loginStatus)} */}
        <Navbar bg="light">
		  <img alt="logo" src={logoImg} className="message-icon" onClick={() => this.setState({redirectURL: "/Home"})} />
		  {/* <SearchBox handleSearch={this.handleSearch}/> */}
		  <SearchBox />
	      {this.state.loginStatus ? 
	      <Nav className="ml-auto">
			  <NavDropdown title="Teach" id="basic-nav-dropdown" variant="success">
		        <NavDropdown.Item href="/CourseCreation">Create a New Course</NavDropdown.Item>
		        <NavDropdown.Item href="/PersonalCourses/tp">View Past Courses</NavDropdown.Item>
		        <NavDropdown.Item href="/PersonalCourses/tf">View Upcoming Courses</NavDropdown.Item>
		      </NavDropdown>
		      <NavDropdown title="Learn" id="basic-nav-dropdown">
		        <NavDropdown.Item href="/Search">Find a Course</NavDropdown.Item>
		        <NavDropdown.Item href="/PersonalCourses/sp">View Past Courses</NavDropdown.Item>
		        <NavDropdown.Item href="/PersonalCourses/sf">View Upcoming Courses</NavDropdown.Item>
		      </NavDropdown>
		      <NavDropdown title="User" id="basic-nav-dropdown">
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
