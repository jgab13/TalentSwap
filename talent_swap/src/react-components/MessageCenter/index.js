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
                {(user) => (
                    <div>
                        <Header />
                        <Container>
                            <Row>
                                <Col><MessageContacts contactIds={user.getContactIds()} /></Col>
                                <Col><MessageContents messages={user.getMessagesFromContact(1)} /></Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </UserContext.Consumer>
        )
    }
}

export default MessageCenter;