import React from "react";
import { uid } from "react-uid";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {UserContext} from "./../../react-contexts/user-context";
import UserManager from "./../../users/user-manager";

class MessageContacts extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
            selectedContact: null
        };
    }
    componentDidMount() {
        if (this.props.contactUsernames) {
            const contacts = this.props.contactUsernames.map(username => UserManager.getUserFromUsername(username));
            this.setState({
                contacts: contacts,
                selectedContact: contacts[0]
            })
        }
    }
    render() {
        if (!this.state.contacts) {
            return <div></div>
        }
        return (
            <ListGroup>
                {this.state.contacts
                .map(contact => (<ListGroupItem key={uid(contact)}>{contact.name}</ListGroupItem>))}
            </ListGroup>
        )
    }
}


export default MessageContacts;