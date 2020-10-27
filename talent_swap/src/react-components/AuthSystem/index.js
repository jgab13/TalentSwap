import React from 'react';
import './styles.css';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Login extends React.Component {
	render() {
  	return (
  	<div>
			<Form>
			  <Form.Group controlId="formBasicEmail">
			    <Form.Label>Username</Form.Label>
			    <Form.Control type="email" placeholder="Enter your username" />
			  </Form.Group>

			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Enter your password" />
			  </Form.Group>

			  <Button variant="success" type="submit">
			    Log In
			  </Button>
			</Form>
		</div>  
		);
	}  
}

class Signup extends React.Component {
	render() {
  	return (
  	<div>
			<Form>
			  <Form.Group controlId="formBasicEmail">
			    <Form.Label>Username</Form.Label>
			    <Form.Control type="email" placeholder="Enter your username" />
			  </Form.Group>

			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Enter your password" />
			  </Form.Group>

			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Confirm Password</Form.Label>
			    <Form.Control type="password" placeholder="Enter your password" />
			  </Form.Group>

			  <Button variant="success" type="submit">
			    Sign Up
			  </Button>
			</Form>
		</div>  
		);
	}
}

class AuthSystem extends React.Component {
	constructor() {
    super();
    this.state = {
      showLogin: true
    };
  }

  Login() {
    this.setState({
      showLogin: true
    });
  }

  Signup() {
    this.setState({
      showLogin: false
    });
  }

  render() {
  	return (
		  <div className='popup'>  
				<div className='popup_inner'>
					<div className='auth-system'>
						<Button
							variant="outline-success"
							onClick={this.Login.bind(this)}
						>LOG IN</Button>
						<Button
							variant="outline-success"
							onClick={this.Signup.bind(this)}
							className='signup'
						>SIGN UP</Button>
						{this.state.showLogin ? <Login/> : <Signup/>}
					</div>
				</div>  
		  </div>  
		);
  }  
}

export default AuthSystem;