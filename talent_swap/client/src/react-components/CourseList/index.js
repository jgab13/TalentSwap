import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// import { uid } from "react-uid";
import CourseRating from "./../CourseRating";
import Button from "react-bootstrap/Button";

class CourseList extends React.Component {
  render() {
  	const {course, link, alreadyEnrolled, completed, user, admin} = this.props;
    
    const button = (admin ? <Button className="button" variant="light" size="lg" disabled> Enroll now! </Button> :(course.enrollment === course.capacity ? <Button className="button" variant="light" size="lg" disabled> Class full! </Button> : 
                  (completed ? <Button className="button" variant="light" size="lg" disabled> Class completed! </Button> :
                  (user === undefined? <Button className="button" variant="light" onClick={link} size="lg"> Enroll now!</Button> :
                  (!alreadyEnrolled ? <Button className="button" variant="light" onClick={link} size="lg"> Enroll now!</Button> :
                  <Button className="button" variant="light" size="lg" disabled> Enrolled </Button>)))));
    

    return (
    <div className="courseDescrip"> 
      <h1 className="title">{course.topic}</h1>
      <div id="desc">{course.description}</div>
      <div id="detail">
        <h5>Course Details:</h5>
        <span>Teacher: {course.teacher}</span><br/>
        <span>Start: {course.starttime.toLocaleString("en-US")}</span><br/>
        <span>End: {course.endtime.toLocaleString("en-US")}</span><br/> 

        <CourseRating rating={course.rate}/>
        {button}
      
        <div id="last"><span>Enrollment: {course.enrollment} of {course.capacity}</span><br/>
          <span>Credits: {course.credit}</span><br/>
        </div>
      </div>
    </div>
    );
  }
}

export default CourseList;