import React from 'react';

import User from "./../../users/user";
import { UserContext } from './../../react-contexts/user-context';

class ContextComponent extends React.Component {
    changeUser = (user) => {this.setState({currentUser: user})}
    state = {
        currentUser: new User(),
        changeUser: this.changeUser
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