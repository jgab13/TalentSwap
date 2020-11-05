import React from "react";
import {UserContext} from "../../react-contexts/user-context";
import Header from "./../Header";
import {Container, Row, Col} from 'react-bootstrap';
import MessageContacts from "../MessageContacts";
import MessageContents from "../MessageContents";

class MessageCenter extends React.Component {
    static contextType = UserContext;
    render() {
        const {currentUser} = this.context;
        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Col><MessageContacts contactIds={currentUser.getContactIds()} /></Col>
                        <Col><MessageContents messages={currentUser.getMessagesFromContact(1)} /></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MessageCenter;