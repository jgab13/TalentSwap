import React from "react";
import { Button } from 'react-bootstrap';
import {UserContext} from "./../../react-contexts/user-context";
import UserManager from "./../../users/user-manager";
import "./styles.css";

class IceBreaker extends React.Component {
    static contextType = UserContext;

    clickHandler = async (event) => {
        const input = event.target.parentElement.querySelector("input[type=\"text\"]");
        const username = input.value;
        input.value = "";
        if (username) {
            const user = await UserManager.getUserFromUsername(username);
            if (!user) {
                alert("No such user!");
                return;
            }
            const contactUsernames = [...this.props.messageCenter.state.contactUsernames, username];
            const selectedContact = username;
            const messages = [];
            this.props.messageCenter.setState({
                selectedContact: selectedContact,
                contactUsernames: contactUsernames,
                messages: messages
            })
        }
    }

    render() {
        return (
            <div className="contact-input">
                <input type="text" placeholder="username" />
                <Button variant="primary" type="button" onClick={this.clickHandler}>Start Conversation</Button>
            </div>
        )
    }
}


export default IceBreaker;