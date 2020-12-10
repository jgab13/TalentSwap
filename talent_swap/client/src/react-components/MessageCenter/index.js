import React from "react";
import {UserContext} from "../../react-contexts/user-context";
import Header from "./../Header";
import {Container, Row, Col} from 'react-bootstrap';
import MessageContacts from "../MessageContacts";
import MessageContents from "../MessageContents";
import { Redirect } from "react-router-dom";

class MessageCenter extends React.Component {
    static contextType = UserContext;
    state = {
        selectedContact: null,
        contactUsernames: null,
        messages: null
    }
    async componentDidMount() {
        const {currentUser} = this.context;
        if (!currentUser) {
            return;
        }
        const contactUsernames = await currentUser.getContactUsernames();
        const selectedContact = contactUsernames[0];
        const messages = await currentUser.getMessagesFromContact(selectedContact);
        console.log(contactUsernames, selectedContact, messages)
        this.setState({
            selectedContact: selectedContact,
            contactUsernames: contactUsernames,
            messages: messages
        })
    }

    render() {
        const {currentUser} = this.context;
        if (currentUser === null) {
            return <Redirect to="/" />
        }
        if (this.state.contactUsernames === null) {
            return <div></div>
        }
        return (
            <div>
                <Header />
                <Container>
                    <Row><h1>Currently Messaging: {this.state.selectedContact}</h1></Row>
                    <Row>
                        <Col><MessageContacts contactUsernames={this.state.contactUsernames} messageCenter={this} /></Col>
                        <Col><MessageContents selectedContact={this.state.selectedContact} messages={this.state.messages} sendMessageHandler={async (message) => {await currentUser.sendMessage(this.state.selectedContact, message)}} /></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MessageCenter;