import React from "react";
import {UserContext} from "../../react-contexts/user-context";
import MessageContacts from "../MessageContacts";

class MessageCenter extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {(user) => (
                    <MessageContacts contactIds={user.getContactIds()} />
                )}
            </UserContext.Consumer>
        )
    }
}

export default MessageCenter;