import React from "react";
import Header from "./../Header";
import "./styles.css";
import { hardcodedCourses } from "./../../courses/testcourses"
import { CreateCourse } from "../../actions/course";
import { Button, Row, Col, Form }from "react-bootstrap";

/* The CourseCreation Component */
class CourseCreation extends React.Component {

	constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    if (this.props.location.state) {
    	this.state = {
		topic: this.props.location.state.course.topic,
    	teacher: this.props.location.state.course.teacher,
    	starttime: this.props.location.state.course.starttime.toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit', hour12:false}),
    	endtime: this.props.location.state.course.endtime.toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit', hour12:false}),
    	date: this.props.location.state.course.endtime.toLocaleDateString("fr-CA",{year: "numeric",
																		   		month: "2-digit",
																		   		day: "2-digit"}),
    	credit: this.props.location.state.course.credit,
    	capacity: this.props.location.state.course.capacity,
    	area: this.props.location.state.course.area,
    	description: this.props.location.state.course.description    	}
	}
    else{
    	this.state = {
		topic: "",
    	teacher: "user1",
    	starttime: "",
    	endtime: "",
    	credit: 0,
    	capacity: 0,
    	area: "",
    	description: ""
    	}
    }    
  }

	handleSubmit(event) {
		event.preventDefault(); //testing
		//Push new course to database
		CreateCourse(this.state);
		this.props.location.state ?
		alert('Changes has been made to your course.')
		:
    	alert('Congratulations! A new course has been created!');
    	window.location.href='/DetailedCoursePageTeacher';
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
			    <Form.Label column sm="3">
			      Topic *
			    </Form.Label>
			    <Col sm="9">
			      <Form.Control required
			      type="text"
			      name="topic"
			      value={this.state.topic}
			      onChange={this.handleChange}/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="3">
			      Time *
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
			    <Form.Label column sm="3">
			      Date *
			    </Form.Label>
			    <Col sm="6">
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
			        name='recurring'
			        label='only once'
			        value='false'
			      />
			      <Form.Check
			        type='radio'
			        id='recurring'
			        label='recurring'
			        value='true'
			        name='recurring'
			        onChange={this.handleChange}
			      />
			      </Col>
			      <Form.Text id="dateBlock" className="help-date" muted>
					    If you checked recurring, system will automatically create courses
					    every week at the same time for you.
					</Form.Text>  	
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="3">
			      Capacity *
			    </Form.Label>
			    <Col sm="9">
			      <Form.Control required
			      type="number"
			      name="capacity"
			      value={this.state.capacity}
			      onChange={this.handleChange}/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="3">
			      Credit *
			    </Form.Label>
			    <Col sm="9">
			      <Form.Control required
			      type="number"
			      name="credit"
			      value={this.state.credit}
			      onChange={this.handleChange}/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="3">
			      Area
			    </Form.Label>
			    <Col sm="9">
			      <Form.Control
			      type="text"
			      name="area"
			      value={this.state.area}
			      onChange={this.handleChange}/>
			    </Col>
			  </Form.Group>

			  <Form.Group as={Row}>
			    <Form.Label column sm="3">
			      Description
			    </Form.Label>
			    <Col sm="9">
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