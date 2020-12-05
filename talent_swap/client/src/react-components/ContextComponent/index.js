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
    logout = async () => {
        await UserManager.logout();
        this.changeUser(undefined);
    }
    state = {
        currentUser: undefined,
        changeUser: this.changeUser,
        login: this.login,
        logout: this.logout
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