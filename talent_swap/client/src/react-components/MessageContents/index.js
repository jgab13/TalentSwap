import React from "react";
import { uid } from "react-uid";
import "./styles.css";
import { Button } from 'react-bootstrap';
import {UserContext} from "./../../react-contexts/user-context";

class MessageContents extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            selectedContact: this.props.selectedContact,
            messages: this.props.messages,
            messageToSend: ""
        };
        this.sendMessageHandler = this.props.sendMessageHandler;
    }
    handleInputChange = (event) => {
        this.setState({
            messageToSend: event.target.value
        });
    };
    render() {
        const {currentUser} = this.context;
        return (
            <div className="message-container">
                <div className="message-contents">
                    {this.state.messages
                    .map(message => (
                        <div key={uid(message)} className={message.senderName === currentUser.id ? "self" : "other"}>
                            <span>{message.contents}</span>
                        </div>
                    ))}
                </div>
                <div className="message-input">
                    <input type="text" onChange={this.handleInputChange} value={this.state.messageToSend} />
                    <Button variant="primary" type="button" onClick={() => {
                        this.sendMessageHandler(this.state.messageToSend);
                        this.setState({
                            messages: currentUser.getMessagesFromContact(this.state.selectedContact),
                            messageToSend: ""
                        });

                    }}>Send</Button>
                </div>
            </div>
        )
    }
}

export default MessageContents;