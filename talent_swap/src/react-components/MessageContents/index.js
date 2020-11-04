import React from "react";
import { uid } from "react-uid";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {UserContext} from "./../../react-contexts/user-context";

class MessageContents extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages
        };
    }
    render() {
        const {currentUser} = this.context;
        return (
            <ListGroup>
                {this.state.messages
                .map(message => (
                    <ListGroupItem key={uid(message)} className={message.senderId === currentUser.id ? "text-right" : "text-left"} variant={message.senderId === currentUser.id ? "primary" : "secondary"}>
                        {message.contents}
                    </ListGroupItem>
                ))}
            </ListGroup>
        )
    }
}

export default MessageContents;