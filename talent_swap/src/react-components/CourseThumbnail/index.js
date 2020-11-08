import React from "react";
import "./styles.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CourseThumbnail(props){
    const course = props.course;
    return(
        <Card id="courseCard">
            <Card.Img id="coursePic" variant="top" src={course.pic}/>
            <Card.Body id="body">
                <Card.Title>
                    {course.topic}
                </Card.Title>
                <Card.Subtitle>
                    with {course.teacher}
                </Card.Subtitle>
                <Card.Text>
                    <span className="text">
                        {course.level} | {course.enrollment}/{course.capacity} enrolled
                    </span> <br></br>
                    <span className="text">
                        {course.starttime} - {course.endtime} {course.date}
                    </span> <br></br>
                    <Button id="courseButton" variant="success" href={`/DetailedCoursePage`}>
                        view course details
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CourseThumbnail;