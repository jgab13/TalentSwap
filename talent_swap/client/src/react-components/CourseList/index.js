import React from "react";
import "./styles.css";
import CourseRating from "./../CourseRating";
import Button from "react-bootstrap/Button";

class CourseList extends React.Component {
  render() {
  	const {course, link, alreadyEnrolled, completed, user, admin} = this.props;

    const rstarttime = new Date(course.starttime);
    const rendtime = new Date(course.endtime);
    
    const button = (admin ? <Button className="button" variant="light" size="lg" disabled> Enroll now! </Button> : 
                  (completed ? <Button className="button" variant="light" size="lg" disabled> Class completed! </Button> :
                  (user === null? (course.enrollment === course.capacity ? <Button className="button" variant="light" size="lg" disabled> Class full! </Button> : <Button className="button" variant="light" onClick={link} size="lg"> Enroll now!</Button>) :
                  (user === course.teacher? <Button className="button" variant="light" size="lg" disabled> Enrolled </Button> :
                  (!alreadyEnrolled ? (course.enrollment === course.capacity ? <Button className="button" variant="light" size="lg" disabled> Class full! </Button> :<Button className="button" variant="light" onClick={link} size="lg"> Enroll now!</Button>) :
                  <Button className="button" variant="light" size="lg" onClick={link}> Unenroll </Button>)))));
    

    return (
    <div className="courseDescrip"> 
      <h1 className="title">{course.topic}</h1>
      <div  id="coursepic"><img src={course.picture} /> </div>
      <div id="desc">{course.description}</div>
      <div id="detail">
        <h5>Course Details:</h5>
        <span>Teacher: {course.teacher}</span><br/>
        <span>Start: {rstarttime.toLocaleString("en-US")}</span><br/>
        <span>End: {rendtime.toLocaleString("en-US")}</span><br/> 

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
