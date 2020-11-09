import React from "react";
import {UserContext} from "./../../react-contexts/user-context";
import Header from "./../Header";
import { ListGroup, ListGroupItem, Container, Row, Col, Image } from 'react-bootstrap';
import UserProfileField from "./../../react-components/UserProfileField";
import UserProfileCourses from "./../UserProfileCourses";

import UserManager from "./../../users/user-manager";
import {hardcodedCourses} from "./../../courses/testcourses.js";

class UserProfile extends React.Component {
    static contextType = UserContext;
    render() {
        if (this.props.match) {
            const {match: {params}} = this.props;
            const {userId} = params;
            var currentUser = UserManager.getUserFromId(parseInt(userId));
            var canEdit = false;
        } else {
            var {currentUser} = this.context;
            var canEdit = true;
        }
        return (
            <div>
                <Header />
                <Container>
                    <Row className="row-cols-1 row-cols-md-3">
                        <Col>
                            <ListGroup>
                                <ListGroupItem>
                                    <Image src={currentUser.pic} thumbnail />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Name" fieldValue={currentUser.name} changeValue={currentUser.changeName} canEdit={canEdit} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Short Bio" fieldValue={currentUser.bio} changeValue={currentUser.changeBio} canEdit={canEdit} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Domain of Expertise" fieldValue={currentUser.expertise} changeValue={currentUser.changeExpertise} canEdit={canEdit} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Domain of Development" fieldValue={currentUser.development} changeValue={currentUser.changeDevelopment} canEdit={canEdit} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Credits" fieldValue={currentUser.credits} canEdit={false} />
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col>
                            <UserProfileCourses header="Teaching Courses" courses={hardcodedCourses.filter(courses => courses.teacher === currentUser.name)} />
                        </Col>
                        <Col>
                            <UserProfileCourses header="Learning Courses" courses={hardcodedCourses.filter(courses => courses.teacher !== currentUser.name)} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default UserProfile;