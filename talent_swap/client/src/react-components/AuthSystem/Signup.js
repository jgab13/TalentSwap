import React from 'react';
import './styles.css';

import { CheckUsername } from "../../actions/user";
import {UserContext} from "./../../react-contexts/user-context";

import { Button, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom';


class Signup extends React.Component {
	static contextType = UserContext;

	constructor(props) {
    super(props);
    this.state = {
    	redirect: false,
	  	input: {
	  		username: '',
	  		password1: '',
	  		password2: ''
	  	}
	  };
	this.handleSignup = this.handleSignup.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

	handleChange(event) {
		let input = this.state.input;
		input[event.target.name] = event.target.value;
		this.setState({
			input
		});
	}

	renderRedirect() {
		if (this.state.redirect) {
			return <Redirect to='/UserDashboard' />
		}
	}

	async handleSignup(event) {	
		event.preventDefault();
		//input shown in address bar need to be salted?
		if (this.validate()) {
			let user = await CheckUsername(this.state.input)
			console.log(user)
			if (user.user === null) {
				await this.context.register(this.state.input.username, this.state.input.password1)
				alert("You have successfully registered!")
				this.setState({redirect:true});
			}
			else {
				alert("This username is taken, please change another username!")
			}		
			//Push new user to database
			/*
			let currentUser = new User({
				//user id could be userList length
				//should we save list as react context too?
				name: this.state.input.username;
				password: 
				credit: 10; //inital credit?
			});
			*/
		}
		else {
			alert("Passwords are not the same, please check your password input.");
		}
	}

	validate() {
		if (this.state.input.password1 === this.state.input.password2) {
			return true;
		}
		return false;
	}

	render() {
	  	return (
	  	<div>
	  		{this.renderRedirect()}
				<Form onSubmit={this.handleSignup}>
				  <Form.Group controlId="formBasicUser">
				    <Form.Label>Username</Form.Label>
				    <Form.Control required
				    	name="username"
					    type="text"
					    placeholder="Enter your username"
					    onChange={this.handleChange}
					    value={this.state.input.username} />
				  </Form.Group>

				  <Form.Group controlId="formBasicPassword1">
				    <Form.Label>Password</Form.Label>
				    <Form.Control required
				    	name="password1"
				    	type="password"
				    	placeholder="Enter your password"
				    	onChange={this.handleChange}
				    	value={this.state.input.password1}/>
				  </Form.Group>

				  <Form.Group controlId="formBasicPassword2">
				    <Form.Label>Confirm Password</Form.Label>
				    <Form.Control required
				    name="password2"
				    type="password"
				    placeholder="Enter your password"
				    onChange={this.handleChange}
				    value={this.state.input.password2}/>
				  </Form.Group>

				  <Button variant="success" type="submit" className='submit'>
				    Sign Up
				  </Button>
				</Form>
			</div>  
		);
	}
}

export default Signup;