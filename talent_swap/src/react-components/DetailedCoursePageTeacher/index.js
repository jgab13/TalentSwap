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

const currCourse = hardcodedCourses[2];
//should be fetched from database

//currCourse.starttime = currCourse.starttime.toLocaleTimeString("en-US", {timeStyle: 'short'});
//currCourse.endtime = currCourse.endtime.toLocaleTimeString("en-US", {timeStyle: 'short'});
//currCourse.date = currCourse.endtime.toLocaleDateString("en-US")

const enrollment = ["user2", "user3", "user4"];
  

class DetailedCoursePageTeacher extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      course: currCourse,
    }
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    })
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to=
      {{
        pathname: '/CourseCreation',
        state: {
          course: this.state.course}
      }} />
    }
  }

  render() {
    const {topic, description, enrollment, capacity, teacher, credit, starttime, endtime, date} = this.state.course;
    return (
      <div>
      {console.log(currCourse)}
      {this.renderRedirect()}
      <Header/>
      <div className="courseDescrip">
      <h1 className="title">{topic}</h1>
      <div id="desc">{description}</div>
      <div id="detail">
        <h5>Course Details:</h5>
        <span>Enrollment: {enrollment}/{capacity}</span><br/>
        <span>Teacher: {teacher}</span><br/>
        <span>Start: {starttime.toLocaleString("en-US")}</span><br/>
        <span>End: {endtime.toLocaleString("en-US")}</span><br/>
        <span>Credit: {credit}</span><br/>
        <span>Status: Upcoming</span><br/>
        <Button className="edit" onClick={this.setRedirect} variant="success"> Edit</Button>
      </div>
        <span title="You can not enroll in your own course.">
          <Button className="button" variant="light" size="lg" disabled>
            Enroll
          </Button>
        </span>
    </div>
    <h3>Reviews for this course: </h3>
    <CourseReview review={this.state.course.feedback}/>
    </div>
    );
  }
}

export default DetailedCoursePageTeacher;
