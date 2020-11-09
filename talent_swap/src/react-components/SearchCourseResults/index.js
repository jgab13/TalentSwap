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
            <CardDeck id="cardDeck">
                {courses.map( course => 
                    <CourseThumbnail id="card" key={course.id.toString()}
                            course = {course} />
                )}
            </CardDeck>
        );
    }
}

export default CourseResults;