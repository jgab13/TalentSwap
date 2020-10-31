import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// import { uid } from "react-uid";
import CourseRating from "./../CourseRating";
import Button from "react-bootstrap/Button";

// const cur = new Date(Date.now());
// console.log(cur)
// console.log(cur.getMonth() + 1)
// console.log(cur.getFullYear())
// console.log(cur.getDate())
class CourseList extends React.Component {
  render() {
  	const {title, description, enrolled, capacity, rate, instruct, instImg, link, alreadyEnrolled, credit, start, completed, user} = this.props;
    
    const button = (enrolled === capacity ? <Button className="button" variant="light" size="lg" disabled> Class full! </Button> : 
                  (completed ? <Button className="button" variant="light" size="lg" disabled> Class completed! </Button> :
                  (user === null? <Button className="button" variant="light" onClick={link} size="lg"> Enroll now!</Button> :
                  (!alreadyEnrolled ? <Button className="button" variant="light" onClick={link} size="lg"> Enroll now!</Button> :
                  <Button className="button" variant="light" size="lg" disabled> Enrolled </Button>))));
    

    return (
    <div className="courseDescrip">
  		<h1>{title}</h1>
  		<div id="desc">{description}</div>

  		<CourseRating rating={rate} instructor={instruct} instructImg={instImg}/>
      {button}
      
      <div id="last"><span>Enrollment: {enrolled} of {capacity}</span><br/>
        <span>Start: {start}</span><br/>
        <span>Credits: {credit}</span><br/>
      </div>

    </div>

    );
  }
}

export default CourseList;
