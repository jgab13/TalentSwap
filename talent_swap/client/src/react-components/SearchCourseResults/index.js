import React from "react"
import CardDeck from "react-bootstrap/CardDeck"
import {uid} from "react-uid"
// import {Col, Row} from "react-bootstrap"
import CourseThumbnail from "./../CourseThumbnail"
// import "./styles.css"

class CourseResults extends React.Component{
    render(){
        const courses = this.props.courses;
        // const loginStatus = this.props.loginStatus;
        // console.log(courses);
        return(
            <div id="cardDeck" className="row row-cols-1 row-cols-md-3">
                {courses.map( course => 
                    <CourseThumbnail id="card" key = {uid(course)}
                            course = {course} />
                )}
            </div>
        );
    }
}

export default CourseResults;