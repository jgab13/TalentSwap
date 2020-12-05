import React from 'react';

import User from "./../../users/user";
import UserManager from "./../../users/user-manager";
import { UserContext } from './../../react-contexts/user-context';

class ContextComponent extends React.Component {
    changeUser = (user) => {this.setState({currentUser: user})}
    login = async (username, password) => {
        const user = await UserManager.login(username, password);
        this.changeUser(user);
        return user;
    }
    state = {
        currentUser: new User(),
        changeUser: this.changeUser,
        login: this.login
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default ContextComponent;