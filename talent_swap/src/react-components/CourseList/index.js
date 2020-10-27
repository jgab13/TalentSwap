import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// import { uid } from "react-uid";
import CourseRating from "./../CourseRating";

class CourseList extends React.Component {
  render() {
  	const {title, description, enrolled, capacity, rate, instruct, instImg} = this.props;
    return (
    <div className="courseDescrip">
		<h1>{title}</h1>
		<div id="desc">{description}</div>
		<div id="last">Current enrolment: {enrolled} of {capacity} spots filled</div>

		<CourseRating rating={rate} instructor={instruct} instructImg={instImg}/>

    </div>

    );
  }
}

export default CourseList;
