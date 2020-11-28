import React from 'react';
import './styles.css';
import Login from './Login'
import Signup from './Signup'
import Button from "react-bootstrap/Button";

class AuthSystem extends React.Component {
	constructor() {
    super();
    this.state = {
      showLogin: true, // Get cookies from browser
      hidePopup: false
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

  Cancel() {
  	this.setState({
      hidePopup: true
    });
  }

  render() {
  	return (
  		<div>
	  		{this.state.hidePopup ? null :
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
								<Button
									variant="outline-success"
									onClick={this.Cancel.bind(this)}
									className="float-right"
									>Cancel</Button>
								{this.state.showLogin ? <Login/> : <Signup/>}
							</div>
						</div>  
				  </div>
			  }
		  </div> 
		);
  }
}

export default AuthSystem;