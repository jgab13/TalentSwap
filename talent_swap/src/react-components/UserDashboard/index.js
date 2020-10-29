import React from "react";
import {UserContext} from "./../../react-contexts/user-context";
import { ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import UserProfileField from "./../../react-components/UserProfileField";

class UserDashboard extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {(user) => (
                    <Container>
                        <Row>
                            <Col>PROFILE PICTURE GOES HERE OR SOMETHING</Col>
                            <Col>
                                <ListGroup>
                                    <ListGroupItem>
                                        <UserProfileField fieldName="Name" fieldValue={user.name} changeValue={user.changeName} />
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <UserProfileField fieldName="Short Bio" fieldValue={user.bio} changeValue={user.changeBio} />
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <UserProfileField fieldName="Domain of Expertise" fieldValue={user.expertise} changeValue={user.changeExpertise} />
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <UserProfileField fieldName="Domain of Development" fieldValue={user.development} changeValue={user.changeDevelopment} />
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                )}
            </UserContext.Consumer>
        )
    }
}

export default UserDashboard;