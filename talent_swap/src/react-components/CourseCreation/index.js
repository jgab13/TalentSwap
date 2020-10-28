import React from "react";
import Header from "./../Header";
import "./styles.css";

import { Button, Row, Col, Form }from "react-bootstrap";

/* The CourseCreation Component */
class CourseCreation extends React.Component {
	
	constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	handleSubmit() {
    alert('Congratulations! A new course has been created!');
	}

  render() {
    return (
      <div>
      	<Header/>

				<div className="course-form">
      	<Form onSubmit={this.handleSubmit}>
			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Topic
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control required type="text"/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Time
			    </Form.Label>
			    <Col sm="4"><Form.Control required type="time"/></Col>
			    <Col sm="1">-</Col>
			    <Col sm="4"><Form.Control required type="time"/></Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Date
			    </Form.Label>
			    <Col sm="7">
			    		<Form.Control type="date"/>
			    </Col>
			    <Col sm="3">
			      <Form.Check
			      	defaultChecked
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

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Capacity
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control required type="number"/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Credit
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control required type="number"/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Area
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control type="text"/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Description
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control as="textarea" rows={3}/>
			    </Col>
			  </Form.Group>

			  <Button
			  	variant="success"
			  	type="submit"
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