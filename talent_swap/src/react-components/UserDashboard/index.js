import React from "react";
import {UserContext} from "./../../react-contexts/user-context";
import UserProfileField from "./../../react-components/UserProfileField";

class UserDashboard extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {(user) => (
                    <div>
                        <UserProfileField fieldName="Name" fieldValue={user.name} changeValue={user.changeName} />
                        <UserProfileField fieldName="Short Bio" fieldValue={user.bio} changeValue={user.changeBio} />
                        <UserProfileField fieldName="Domain of Expertise" fieldValue={user.expertise} changeValue={user.changeExpertise} />
                        <UserProfileField fieldName="Domain of Development" fieldValue={user.development} changeValue={user.changeDevelopment} />
                    </div>
                )}
            </UserContext.Consumer>
        )
    }
}

export default UserDashboard;