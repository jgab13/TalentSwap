import React from "react";
import Header from "./../Header";
import "./styles.css";

import Button from "react-bootstrap/Button";
import { Row, Col, Form, Alert }from "react-bootstrap";

/* The CourseCreation Component */
class CourseCreation extends React.Component {
	
	constructor(props) {
    super(props);
    this.state = {submitted: false};
  }

	createCourse() {
		this.setState({
      submitted: true
    });
	}

  render() {
    return (
      <div>
      	<Header/>

      	<Alert show={this.state.submitted} variant="success" className='alert'>
	        <Alert.Heading>Congratulations!</Alert.Heading>
	        <p>
	          A new course has been created!
	        </p>
	        <hr />
	        <div className="d-flex justify-content-end">
	          <Button variant="outline-success" href="/DetailedCoursePage">
	            Details
	          </Button>
	        </div>
        </Alert>

				<div className="course-form">
      	<Form>
			  <Form.Group as={Row} controlId="formPlaintextPassword">
			    <Form.Label column sm="2">
			      Topic
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control type="text"/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row} controlId="formPlaintextPassword">
			    <Form.Label column sm="2">
			      Time
			    </Form.Label>
			    <Col sm="4"><Form.Control type="time"/></Col>
			    <Col sm="1">-</Col>
			    <Col sm="4"><Form.Control type="time"/></Col>
			  </Form.Group>

			  <Form.Group as={Row} controlId="formPlaintextPassword">
			    <Form.Label column sm="2">
			      Date
			    </Form.Label>
			    <Col sm="7">
			    		<Form.Control type="date"/>
			    </Col>
			    <Col sm="3">
			      <Form.Check 
			        type='radio'
			        id='only once'
			        label='only once'
			        name='time type'
			      />
			      <Form.Check
			        type='radio'
			        id='recurring'
			        label='recurring'
			        name='time type'
			      />
			  	</Col>
			  </Form.Group>

			  <Form.Group as={Row} controlId="formPlaintextPassword">
			    <Form.Label column sm="2">
			      Area
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control type="text"/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row} controlId="formPlaintextPassword">
			    <Form.Label column sm="2">
			      Capacity
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control type="value"/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row} controlId="formPlaintextPassword">
			    <Form.Label column sm="2">
			      Description
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control as="textarea" rows={3}/>
			    </Col>
			  </Form.Group>

			  <Button
			  	variant="success"
			  	onClick={this.createCourse.bind(this)}
			  	className="submit">
			    Submit
			  </Button>
				</Form>
				</div>
      </div>
    );
  }
}

export default CourseCreation;