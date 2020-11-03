import React from "react";
import {UserContext} from "./../../react-contexts/user-context";
import Header from "./../Header";
import { ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import UserProfileField from "./../../react-components/UserProfileField";

class UserDashboard extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {({currentUser}) => (
                    <div>
                        <Header />
                        <Container>
                            <Row>
                                <Col>PROFILE PICTURE GOES HERE OR SOMETHING</Col>
                                <Col>
                                    <ListGroup>
                                        <ListGroupItem>
                                            <UserProfileField fieldName="Name" fieldValue={currentUser.name} changeValue={currentUser.changeName} />
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <UserProfileField fieldName="Short Bio" fieldValue={currentUser.bio} changeValue={currentUser.changeBio} />
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <UserProfileField fieldName="Domain of Expertise" fieldValue={currentUser.expertise} changeValue={currentUser.changeExpertise} />
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <UserProfileField fieldName="Domain of Development" fieldValue={currentUser.development} changeValue={currentUser.changeDevelopment} />
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </UserContext.Consumer>
        )
    }
}

export default UserDashboard;