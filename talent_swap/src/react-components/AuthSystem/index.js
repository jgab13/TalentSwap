import React from 'react';
import './styles.css';
import Login from './Login'
import Signup from './Signup'
import Button from "react-bootstrap/Button";

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