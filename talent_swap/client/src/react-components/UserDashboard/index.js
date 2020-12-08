import React from "react";
import UserProfile from "./../../react-components/UserProfile";
import { UserContext } from "../../react-contexts/user-context";
import { Redirect } from "react-router-dom";

class UserDashboard extends React.Component {
    static contextType = UserContext;
    render() {
        const {currentUser} = this.context;
        if (currentUser === null) {
            return <Redirect to="/" />
        }
        return (
            <UserProfile />
        )
    }
}

export default UserDashboard;