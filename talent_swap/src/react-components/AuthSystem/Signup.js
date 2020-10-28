import React from 'react';
import './styles.css';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


class Signup extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
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
  	console.log(input)
  	this.setState({
  		input
  	});
  }

	handleSignup(event) {		
		//input shown in address bar need to be salted?
		if (this.validate()) {
			//functionality
		}
		else {
			event.preventDefault();
			alert("Check your password input.");
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

				  <Button variant="success" type="submit">
				    Sign Up
				  </Button>
				</Form>
			</div>  
		);
	}
}

export default Signup;