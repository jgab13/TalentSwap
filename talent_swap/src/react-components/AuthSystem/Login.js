import React from 'react';
import './styles.css';

import UserManager from "./../../users/user-manager";
import {UserContext} from "./../../react-contexts/user-context";

import { Button, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
	static contextType = UserContext;
	
	constructor(props) {
    super(props);
    this.state = {
    	redirect: null,
    	input: {
    		username: "",
	  		password: ""
    	}
	  };

	  this.handleLogin = this.handleLogin.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  this.validate = this.validate.bind(this);
  }

  renderRedirect() {
    if (this.state.redirect === 'user') {
      return <Redirect to='/UserDashboard' />
    } else if (this.state.redirect === 'admin') {
    	return <Redirect to='/AdminDashboard' />
    }
  }

	handleLogin(event) {
		let currentUser = this.validate();
		if (currentUser !== false) {
			//admin validation
			if (currentUser.userType === "admin") { //usertype
				this.setState({redirect:"admin"});
			}  else {
				this.context.changeUser(currentUser);
				this.setState({redirect:"user"});
			}
			//functionality
			console.log(currentUser);
		}
		else {
			event.preventDefault();
			alert("Validation failed! Please try again.");
		}
	}

	handleChange(event) {
  	let input = this.state.input;
  	input[event.target.name] = event.target.value;
  	console.log(input)
  	this.setState({
  		input
  	});
  }

	validate() {
		//validation
		let input = this.state.input;
		let currentUser = UserManager.login(input.username, input.password);
		console.log(currentUser);
		if (currentUser === undefined) {
			return false;
		}
		return currentUser;
	}

	render() {
  	return (
  	<div>
  		{this.renderRedirect()}
			<Form onSubmit={this.handleLogin}>
			  <Form.Group controlId="formBasicEmail">
			    <Form.Label>Username</Form.Label>
			    <Form.Control required
			    name="username"
			    type="text"
			    placeholder="Enter your username"
			    onChange={this.handleChange}
				value={this.state.input.username}/>
			  </Form.Group>

			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control required
			    name="password"
			    type="password"
			    placeholder="Enter your password"
			    onChange={this.handleChange}
				value={this.state.input.password}/>
			  </Form.Group>

			  <Button variant="success" type="submit" className='submit'>
			    Log In
			  </Button>
			</Form>
		</div>  
		);
	}  
}

export default Login;