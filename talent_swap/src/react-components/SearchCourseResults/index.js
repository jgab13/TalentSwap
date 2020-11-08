import React from "react"
import CardDeck from "react-bootstrap/CardDeck"
import CourseThumbnail from "./../CourseThumbnail"

class CourseResults extends React.Component{
    render(){
        const courses = this.props.courses;
        return(
            <CardDeck>
                {courses.map( course => 
                    <CourseThumbnail key={course.id.toString()}
                            course = {course} />
                )}
            </CardDeck>
        );
    }
}

export default CourseResults;