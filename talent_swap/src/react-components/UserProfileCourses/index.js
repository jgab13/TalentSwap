import React from "react";
import "./styles.css";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import CourseThumbnail from "./../CourseThumbnail";
import {hardcodedCourses} from "./../../courses/testcourses.js";

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
                    <div className="row row-cols-1">
                        <CourseThumbnail key={course.id.toString()} course={course} />
                    </div>
                )}
            </div>
        )
    }
}

export default UserProfileCourses;