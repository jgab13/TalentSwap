import React from "react"
import {uid} from "react-uid"
import CourseThumbnail from "./../CourseThumbnail"

class CourseResults extends React.Component{
    render(){
        const courses = this.props.courses;
        if (!courses) return(<p>No matched courses.</p>)
        return(
            <div className="row row-cols-1 row-cols-md-3">
                {courses.map( course => 
                    <CourseThumbnail id="card" key = {uid(course)}
                            course = {course} />
                )}
            </div>
        );
    }
}

export default CourseResults;