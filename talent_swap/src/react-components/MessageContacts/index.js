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
            contacts: this.props.contactIds.map(id => UserManager.getUserFromId(id)),
            selectedContact: null
        };
        this.state.selectedContact = this.state.contacts[0];
    }
    render() {
        console.log(this.context);
        return (
            <ListGroup>
                {this.state.contacts
                .map(contact => (<ListGroupItem key={uid(contact)}>{contact.name}</ListGroupItem>))}
            </ListGroup>
        )
    }
}


export default MessageContacts;