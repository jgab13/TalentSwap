import React from "react";
import {UserContext} from "./../../react-contexts/user-context";

class UserDashboard extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {(user) => (
                    <div>{user.name}</div>
                )}
            </UserContext.Consumer>
        )
    }
}

export default UserDashboard;