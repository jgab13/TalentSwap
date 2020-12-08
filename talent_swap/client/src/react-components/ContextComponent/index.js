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
        this.changeUser(null);
    }
    register = async (username, password) => {
        const user = await UserManager.register(username, password);
        this.changeUser(user);
        return user;
    }
    checkSession = async () => {
        const request = new Request("/users/check-session", {
            method: "GET"
        });
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                const jsonRes = await res.json();
                const user = await UserManager.getUserFromUsername(jsonRes.currentUser);
                console.log(user);
                this.changeUser(user);
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }
    state = {
        currentUser: undefined,
        loggedIn: undefined,
        changeUser: this.changeUser,
        login: this.login,
        logout: this.logout,
        register: this.register,
        checkSession: this.checkSession
    }

    async componentDidMount() {
        if (this.state.currentUser === undefined) { // undefined denotes unknown login status
            const user = await this.checkSession();
            if (!user) {
                this.setState({currentUser: null}); // No logged in user
            }
        }
    }

    render() {
        if (this.state.currentUser === undefined) { // undefined denotes unknown login status
            return <div></div>
        }
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default ContextComponent;