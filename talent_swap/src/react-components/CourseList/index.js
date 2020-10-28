import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// import { uid } from "react-uid";
import CourseRating from "./../CourseRating";
import Button from "react-bootstrap/Button";

class CourseList extends React.Component {
  render() {
  	const {title, description, enrolled, capacity, rate, instruct, instImg, link, alreadyEnrolled, logged} = this.props;
    
    const button = (enrolled === capacity ? <Button className="button" variant="light" size="lg" disabled> Class full! </Button> : 
                  (!alreadyEnrolled ? <Button className="button" variant="light" onClick={link} size="lg"> Enroll now!</Button> :
                  <Button className="button" variant="light" size="lg" disabled> Enrolled </Button>));

    const notlogged = (logged ? button : <Link to={"./../AuthSystem"}>
                <Button className="button" variant="light" onClick={link} size="lg"> Enroll now!</Button>
              </Link>);
    

    return (
    <div className="courseDescrip">
  		<h1>{title}</h1>
  		<div id="desc">{description}</div>

  		<CourseRating rating={rate} instructor={instruct} instructImg={instImg}/>
      {notlogged}
      
      <div id="last">Enrollment: {enrolled} of {capacity}</div>

    </div>

    );
  }
}

export default CourseList;
