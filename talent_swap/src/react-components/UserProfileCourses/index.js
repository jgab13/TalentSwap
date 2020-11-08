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
        return (
            <div>
                {this.renderRedirect()}
                <h1>{this.props.header}</h1>
                <ListGroup>
                    {hardcodedCourses.map( course => 
                        <ListGroupItem>
                            <CourseThumbnail key={course.id.toString()} course = {course} />
                        </ListGroupItem>
                    )}
                </ListGroup>
            </div>
        )
    }
}

export default UserProfileCourses;