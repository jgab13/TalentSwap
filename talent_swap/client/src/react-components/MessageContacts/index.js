import React from "react";
import { uid } from "react-uid";
import IceBreaker from "./../IceBreaker";
import {UserContext} from "./../../react-contexts/user-context";
import UserManager from "./../../users/user-manager";
import "./styles.css";

class MessageContacts extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
            selectedContact: null
        };
    }
    getContacts = async () => {
        if (this.props.contactUsernames) {
            const contacts = await Promise.all(
                this.props.contactUsernames.map(async username => await UserManager.getUserFromUsername(username))
            );
            this.setState({
                contacts: contacts,
                selectedContact: contacts[0]
            })
        }
    }
    async componentDidMount() {
        this.getContacts();
    }
    async componentDidUpdate(prevProps, prevState) {
        const prev = prevProps.contactUsernames;
        const curr = this.props.contactUsernames;
        if (prev.length !== curr.length || !prev.every((value, index) => value === curr[index])) {
            this.getContacts();
        }
    }
    render() {
        if (!this.state.contacts) {
            return <div></div>
        }
        return (
            // <ListGroup>
            //     {this.state.contacts
            //     .map(contact => (<ListGroupItem key={uid(contact)}>{contact.name}</ListGroupItem>))}
            // </ListGroup>
            <div className="contacts-container">
                <div className="contacts">
                    {this.state.contacts
                    .map(contact => (<div key={uid(contact)}>{contact.username}</div>))}
                </div>
                <IceBreaker messageCenter={this.props.messageCenter} />
            </div>
        )
    }
}


export default MessageContacts;