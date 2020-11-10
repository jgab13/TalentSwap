import React from "react";
import "./styles.css";
import { Redirect } from 'react-router-dom';
import { uid } from "react-uid";

import CourseThumbnail from "./../CourseThumbnail";

class UserProfileCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectURL: ""
        };
        this.renderRedirect = this.renderRedirect.bind(this);
    }
    renderRedirect() {
        if (this.state.redirectURL) {
            return <Redirect to={this.state.redirectURL} />
        }
    }
    render() {
        const {courses, header} = this.props;
        return (
            <div>
                {this.renderRedirect()}
                <h1>{header}</h1>
                {courses.map(course => 
                    <div className="row row-cols-1" key={uid(course)}>
                        <CourseThumbnail key={course.id.toString()} course={course} />
                    </div>
                )}
            </div>
        )
    }
}

export default UserProfileCourses;