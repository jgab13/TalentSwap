import React from "react";
import {UserContext} from "../../react-contexts/user-context";
import Header from "./../Header";
import {Container, Row, Col} from 'react-bootstrap';
import MessageContacts from "../MessageContacts";
import MessageContents from "../MessageContents";

class MessageCenter extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {(userContext) => (
                    <div>
                        <Header />
                        <Container>
                            <Row>
                                <Col><MessageContacts contactIds={userContext.currentUser.getContactIds()} /></Col>
                                <Col><MessageContents messages={userContext.currentUser.getMessagesFromContact(1)} /></Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </UserContext.Consumer>
        )
    }
}

export default MessageCenter;