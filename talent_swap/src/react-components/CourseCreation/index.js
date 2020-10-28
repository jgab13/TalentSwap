import React from "react";
import Header from "./../Header";
import "./styles.css";
import {hardcodedCourses} from "./../../courses/testcourses"
import {addCourse} from "./../../courses/courseManager"

import { Button, Row, Col, Form }from "react-bootstrap";

/* The CourseCreation Component */
class CourseCreation extends React.Component {
	
	constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
			topic: "",
    	teacher: "Alice",
    	starttime: "",
    	endtime: "",
    	date:"",
    	credit: 0,
    	capacity: 0,
    	area: "",
    	description: "",
    	courses: hardcodedCourses
    }
  }

	handleSubmit(event) {
		event.preventDefault(); //testing
		addCourse(this);
    alert('Congratulations! A new course has been created!');
    console.log(this.state.courses);
	}

	handleChange(event) {
		const target = event.target;
    const value = target.value;
    const name = target.name;
  	this.setState({
  		[name]: value
  	});
  };

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
			      <Form.Control required
			      type="text"
			      name="topic"
			      value={this.state.topic}
			      onChange={this.handleChange}/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Time
			    </Form.Label>
			    <Col sm="4"><Form.Control required
			    type="time"
			    name="starttime"
			    value={this.state.starttime}
			    onChange={this.handleChange}/></Col>
			    <Col sm="1">-</Col>
			    <Col sm="4"><Form.Control required type="time"
			    name="endtime"
			    value={this.state.endtime}
			    onChange={this.handleChange}/></Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Date
			    </Form.Label>
			    <Col sm="7">
			    		<Form.Control required
			    		type="date"
			    		name="date"
			      	value={this.state.date}
			      	onChange={this.handleChange}/>
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
			      <Form.Control required
			      type="number"
			      name="capacity"
			      value={this.state.capacity}
			      onChange={this.handleChange}/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Credit
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control required
			      type="number"
			      name="credit"
			      value={this.state.credit}
			      onChange={this.handleChange}/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Area
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control
			      type="text"
			      name="area"
			      value={this.state.area}
			      onChange={this.handleChange}/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="2">
			      Description
			    </Form.Label>
			    <Col sm="10">
			      <Form.Control
			      as="textarea"
			      rows={3}
			      name="description"
			      value={this.state.description}
			      onChange={this.handleChange}/>
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