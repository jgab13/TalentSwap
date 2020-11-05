import React from "react";
import {UserContext} from "./../../react-contexts/user-context";
import Header from "./../Header";
import { ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import UserProfileField from "./../../react-components/UserProfileField";

import UserManager from "./../../users/user-manager";

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
                    <Row>
                        <Col>PROFILE PICTURE GOES HERE OR SOMETHING</Col>
                        <Col>
                            <ListGroup>
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
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default UserProfile;