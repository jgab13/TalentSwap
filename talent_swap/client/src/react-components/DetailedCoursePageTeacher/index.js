import React from "react";
import { Redirect } from 'react-router-dom';
import "./styles.css";
// import { uid } from "react-uid";
import CourseList from "./../CourseList";
import CourseReview from "./../CourseReview"
// import img from ....;

import Container from "react-bootstrap/Container";
import Header from "./../Header"

import instImg from "./logo192.png";
import AuthSystem from "./../AuthSystem"
import AddCourseReview from "./../AddCourseReview"
import {Button, Tooltip, OverlayTrigger} from "react-bootstrap";
import {hardcodedCourses} from "./../../courses/testcourses.js"
import {UserContext} from "./../../react-contexts/user-context";
import { getCourse } from "../../actions/course.js";  

class DetailedCoursePageTeacher extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      course: {
        topic: "",
        description: "",
        enrollment: "",
        capacity: "",
        teacher: "",
        credit: "",
        starttime: "",
        endtime: ""
      },
      courseid: this.props.match.params.id
    }
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidMount() {
      getCourse(this, this.state.courseid) //this is JX's course.      
    }

  setRedirect() {
    if (new Date(this.state.course.endtime) < Date.now()) {
      alert("You can not edit a completed course!")
    }
    else {
      this.setState({
        redirect: true
      })
    }
  }

  renderRedirect() {
    if (this.state.redirect) {
      console.log(this.state.course)
      return <Redirect to=
      {{
        pathname: '/CourseCreation',
        state: {
          course: this.state}
      }} />
    }
  }

  render() {
    const {topic, description, enrollment, capacity, teacher, credit, starttime, endtime} = this.state.course;
    return (
      <div>
      {this.renderRedirect()}
      <Header/>
      <div className="courseDescrip">
      <h1 className="title">{topic}</h1>
      <div id="desc">{description}</div>
      <div id="detail">
        <h5>Course Details:</h5>
        <span>Enrollment: {enrollment?enrollment:0}/{capacity}</span><br/>
        <span>Teacher: {teacher}</span><br/>
        <span>Start: {new Date(starttime).toLocaleString("en-US")}</span><br/>
        <span>End: {new Date(endtime).toLocaleString("en-US")}</span><br/>
        <span>Credit: {credit}</span><br/>
        <span>Status: {new Date(endtime) < Date.now()? "Completed" : "Upcoming"}</span><br/>
        <Button className="edit" onClick={this.setRedirect} variant="success"> Edit</Button>
      </div>
        <span title="You can not enroll in your own course.">
          <Button className="button" variant="light" size="lg" disabled>
            Enroll
          </Button>
        </span>
    </div>
    <h3>Reviews for this course: </h3>
    </div>
    );
  }
}

export default DetailedCoursePageTeacher;
