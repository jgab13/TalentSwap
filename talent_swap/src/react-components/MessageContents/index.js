import React from "react";
import { uid } from "react-uid";
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
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
            <div>
                <ListGroup>
                    {this.state.messages
                    .map(message => (
                        <ListGroupItem key={uid(message)} className={message.senderId === currentUser.id ? "text-right" : "text-left"} variant={message.senderId === currentUser.id ? "primary" : "secondary"}>
                            {message.contents}
                        </ListGroupItem>
                    ))}
                </ListGroup>
                <div>
                    <input type="text" onChange={this.handleInputChange} />
                    <Button variant="primary" type="button" onClick={() => {this.sendMessageHandler(this.state.messageToSend); this.setState({messages: currentUser.getMessagesFromContact(this.state.selectedContact)})}}>Send</Button>
                </div>
            </div>
        )
    }
}

export default MessageContents;