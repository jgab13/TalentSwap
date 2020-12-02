import React from "react";
import { Button } from 'react-bootstrap';

class BannedUser extends React.Component {
    render() {
        const {user, unban} = this.props;

        return (
            <tr>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td><Button variant="primary" onClick={() => unban(user.username)}>UNBAN</Button></td>
            </tr>
        )
    }
}

export default BannedUser;