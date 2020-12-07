import React from "react";
import Header from "./../Header";
import "./styles.css";
import { hardcodedCourses } from "./../../courses/testcourses"
import { CreateCourse, updateCourse } from "../../actions/course";
import { Button, Row, Col, Form }from "react-bootstrap";
import { checkSession } from "./../../actions/user";
import AuthSystem from "./../AuthSystem";


/* The CourseCreation Component */
class CourseCreation extends React.Component {

	constructor(props) {
    super(props);
    checkSession(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    if (this.props.location.state) {
    	this.state = {
		topic: this.props.location.state.course.course.topic,
    	teacher: this.props.location.state.course.course.teacher,
    	starttime: new Date(this.props.location.state.course.course.starttime).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit', hour12:false}),
    	endtime: new Date(this.props.location.state.course.course.endtime).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit', hour12:false}),
    	date: new Date(this.props.location.state.course.course.endtime).toLocaleDateString("fr-CA",{year: "numeric",
																		   		month: "2-digit",
																		   		day: "2-digit"}),
    	credit: this.props.location.state.course.course.credit,
    	capacity: this.props.location.state.course.course.capacity,
    	area: this.props.location.state.course.course.area,
    	description: this.props.location.state.course.course.description    	}
	}
    else{
    	this.state = {
		topic: "",
    	currentUser: "",
    	starttime: "",
    	endtime: "",
    	date: "",
    	credit: 0,
    	capacity: 0,
    	area: "",
    	description: ""
    	}
    }    
  }

	async handleSubmit(event) {
		event.preventDefault(); //testing
		//Push new course to database
		if (new Date(this.state.date + " " + this.state.endtime).getTime() < Date.now()) {
			alert("Course end time can not be earlier than now.")
		}
		else if (this.state.capacity < 1) {
			alert("Capacity can not be smaller than 1.")
		}
		else if (this.state.credit < 0) {
			alert("Credit can not be smaller than 0.")
		}
		else if (this.props.location.state == undefined ) {
			const newCourse = await CreateCourse(this.state);
	    	alert('Congratulations! A new course has been created!');
	    	window.location.href='/DetailedCoursePageTeacher/' + newCourse._id;
	    	}
		else {
			console.log(this.props.location.state)
			let starttime = new Date(this.state.date + " " + this.state.starttime)
			let endtime = new Date(this.state.date + " " + this.state.endtime)
			let  attributes = ["topic", "currentUser", "starttime", "endtime", "credit", "capacity", "area", "description"]
			let values = [this.state.topic, this.state.currentUser, starttime, endtime, this.state.credit, this.state.capacity, this.state.area, this.state.description]
			updateCourse(attributes, values, this.props.location.state.course.courseid)
			alert('Changes has been made to your course.')
			window.location.href='/DetailedCoursePageTeacher/' + this.props.location.state.course.courseid;
		}
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
      {this.props.location.state == undefined && this.state.currentUser == "" ? <AuthSystem/> : null}
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
			    <Col sm="9">
			    		<Form.Control required
			    		type="date"
			    		name="date"
			      	value={this.state.date}
			      	onChange={this.handleChange}/>
			    </Col>  	
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