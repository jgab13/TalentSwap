import React from 'react';
import './styles.css';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Login extends React.Component {
	constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
	  	username: "",
	  	password: ""
	  };
  }

	handleLogin() {
		//functionality
	}

	validate() {
		//validation
		//user-manager?
	}

	render() {
  	return (
  	<div>
			<Form onSubmit={this.handleLogin}>
			  <Form.Group controlId="formBasicEmail">
			    <Form.Label>Username</Form.Label>
			    <Form.Control required type="text" placeholder="Enter your username" />
			  </Form.Group>

			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control required type="password" placeholder="Enter your password" />
			  </Form.Group>

			  <Button variant="success" type="submit">
			    Log In
			  </Button>
			</Form>
		</div>  
		);
	}  
}

export default Login;