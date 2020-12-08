import React from "react";
import {UserContext} from "../../react-contexts/user-context";
import Header from "./../Header";
import {Container, Row, Col} from 'react-bootstrap';
import MessageContacts from "../MessageContacts";
import MessageContents from "../MessageContents";

class MessageCenter extends React.Component {
    static contextType = UserContext;
    state = {
        selectedContact: null,
        contactUsernames: null,
        messages: null
    }
    async componentDidMount() {
        const {currentUser} = this.context;

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
        if (!currentUser || !this.state.selectedContact || !this.state.messages || !this.state.contactUsernames) {
            return <div></div>
        }
        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Col><MessageContacts contactUsernames={this.state.contactUsernames} /></Col>
                        <Col><MessageContents selectedContact={this.state.selectedContact} messages={this.state.messages} sendMessageHandler={(message) => {currentUser.sendMessage(this.state.selectedContact, message)}} /></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MessageCenter;