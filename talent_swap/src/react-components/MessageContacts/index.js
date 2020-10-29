import React from "react";
import { uid } from "react-uid";
import {UserContext} from "./../../react-contexts/user-context";
import UserManager from "./../../users/user-manager";

class MessageContacts extends React.Component {
    // static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            contacts: this.props.contactIds.map(id => UserManager.getUserFromId(id)),
            selectedContact: null
        };
        this.state.selectedContact = this.state.contacts[0];
    }
    render() {
        return (
            <ul>
                {this.state.contacts
                .map(contact => (<li key={uid(contact)}>{contact.name}</li>))}
            </ul>
        )
    }
}
MessageContacts.contextType = UserContext;

export default MessageContacts;