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
    state = {
        currentUser: undefined,
        canEdit: false
    }
    async componentDidMount() {
        let currentUser;
        let canEdit;
        if (this.props.match) {
            const {match: {params}} = this.props;
            const {username} = params;
            currentUser = await UserManager.getUserFromUsername(username);
            canEdit = false;
        } else {
            currentUser = this.context.currentUser;
            canEdit = true;
        }
        this.setState({currentUser: currentUser, canEdit: canEdit});
    }
    render() {
        if (!this.state.currentUser) {
            return <div></div>
        }
        return (
            <div>
                <Header />
                <Container>
                    <Row className="row-cols-1 row-cols-md-3">
                        <Col>
                            <ListGroup>
                                <ListGroupItem>
                                    <Image src={this.state.currentUser.pic} thumbnail />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Name" fieldValue={this.state.currentUser.name} changeValue={this.state.currentUser.changeName} canEdit={this.state.canEdit} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Short Bio" fieldValue={this.state.currentUser.bio} changeValue={this.state.currentUser.changeBio} canEdit={this.state.canEdit} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Domain of Expertise" fieldValue={this.state.currentUser.expertise} changeValue={this.state.currentUser.changeExpertise} canEdit={this.state.canEdit} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Domain of Development" fieldValue={this.state.currentUser.development} changeValue={this.state.currentUser.changeDevelopment} canEdit={this.state.canEdit} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    <UserProfileField fieldName="Credits" fieldValue={this.state.currentUser.credits} canEdit={false} />
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col>
                            <UserProfileCourses header="Teaching Courses" courses={hardcodedCourses.filter(courses => courses.teacher === this.state.currentUser.name)} />
                        </Col>
                        <Col>
                            <UserProfileCourses header="Learning Courses" courses={hardcodedCourses.filter(courses => courses.teacher !== this.state.currentUser.name)} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default UserProfile;