import React from "react";
import Header from "./../Header";
import "./styles.css";
import Row from 'react-bootstrap/Row'
import { Redirect, withRouter } from 'react-router-dom';


/* Component for the Home page */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loginStatus: this.props.location.state === undefined ? true : false
    };
  }

  render() {
    return (
      <div>
        {console.log(this.state.loginStatus)}
        <Header loginStatus={this.state.loginStatus}/>
        <div className="mission" id="top">
          <h1 className="ltitle">Welcome to Talent Swap</h1>
          <p className="mstatement"> Our mission at Talent Swap is to engage a community of teachers and learners to exchange knowledge. Teachers seeking to educate or instruct can offer courses to users on our platform.
          Learners can take interesting courses available on our platform. We provide users the medium and tools to lifelong learn.
          </p>
        </div>
        <div className="mission">
          <p className="teach">
            <h1 className="ltitle">Teach</h1>
            <p className="mstatement"> Share your wisdom with other users through one on one instruction or in a class setting with multiple
            users.  
            </p>
          </p>
          <p className="learn">
            <h1 className="ltitle">Learn</h1>
            <p className="mstatement"> Continue lifelong learning by taking classes in fascinating courses from other users.  
            </p>
          </p>
        </div>
        <div className="mission">
          <h1 className="ltitle">Popular Courses:</h1>
          {/* Insert grid of course thumbnails here */}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);