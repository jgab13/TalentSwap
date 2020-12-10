import React from "react";
import { Link } from 'react-router-dom';
import "./styles.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import pic0 from "./course0pic.jpg"

class CourseThumbnail extends React.Component{
    render(){
        const course = this.props.course;
        // console.log(course)
        const start = new Date(course.starttime)
        const end = new Date(course.endtime)

        return(
            <div className="col">
                <Card id="courseCard">
                    <Card.Img id="coursePic" variant="top" src={course.picture ? course.picture : pic0}/>
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
                                {start.toLocaleDateString("en-US", {hour: '2-digit', minute:'2-digit', hour12:false})} - 
                                    {end.toLocaleDateString("en-US", {hour: '2-digit', minute:'2-digit', hour12:false})} {start.toLocaleDateString("en-US")}
                            </span> <br></br>
                            {/* <Button id="courseButton" variant="success" href={`/DetailedCoursePage/${course.id}`}>
                                    view course details
                                </Button> */}
                            <Link to=
                            {{
                                pathname: '/DetailedCoursePage',
                                state: {
                                course: this.props.course}
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
    
}

export default CourseThumbnail;