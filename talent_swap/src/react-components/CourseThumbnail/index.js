import React from "react";
import { Link } from 'react-router-dom';
import "./styles.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CourseThumbnail(props){
    const course = props.course;

    return(
        <div className="col">
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
                            {course.starttime.toLocaleTimeString("en-US")} - 
                                {course.endtime.toLocaleTimeString("en-US")} {course.starttime.toLocaleDateString("en-US")}
                        </span> <br></br>
                        <Link to=
                        {{
                            pathname: '/DetailedCoursePage',
                            state: {
                            course: props.course}
                        }} >
                            <Button id="courseButton" variant="success">
                                view course details
                            </Button>
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CourseThumbnail;