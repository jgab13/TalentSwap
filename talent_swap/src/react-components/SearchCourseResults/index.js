import React from "react"
import CardDeck from "react-bootstrap/CardDeck"
// import {Col, Row} from "react-bootstrap"
import CourseThumbnail from "./../CourseThumbnail"
// import "./styles.css"

class CourseResults extends React.Component{
    render(){
        const courses = this.props.courses;
        const loginStatus = this.props.loginStatus;
        // console.log(loginStatus);
        return(
            <div id="cardDeck" className="row row-cols-1 row-cols-md-3">
                {courses.map( course => 
                    <CourseThumbnail id="card" key={course.id.toString()}
                            course = {course} />
                )}
            </div>
        );
    }
}

export default CourseResults;