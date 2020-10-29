import React from "react";
import {UserContext} from "../../react-contexts/user-context";
import {Container, Row, Col} from 'react-bootstrap';
import MessageContacts from "../MessageContacts";
import MessageContents from "../MessageContents";

class MessageCenter extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {(user) => (
                    <Container>
                        <Row>
                            <Col><MessageContacts contactIds={user.getContactIds()} /></Col>
                            <Col><MessageContents messages={user.getMessagesFromContact(1)} /></Col>
                        </Row>
                    </Container>
                )}
            </UserContext.Consumer>
        )
    }
}

export default MessageCenter;