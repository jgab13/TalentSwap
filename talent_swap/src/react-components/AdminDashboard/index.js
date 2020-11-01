import React from "react";
import { uid } from "react-uid";
import AdminUser from "./../../users/admin-user";
import Header from "./../Header";
import BannedUser from "./../BannedUser";
import { Button, Table } from 'react-bootstrap';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.admin = new AdminUser();
        this.state = {
            userIdToBan: "",
            bannedUsers: this.admin.getBannedUsers()
        }
    }

    handleInputChange = (event) => {
        this.setState({
            userIdToBan: event.target.value
        });
    };

    handleBan = (event) => {
        this.admin.banUser(parseInt(this.state.userIdToBan));
        this.setState({
            userIdToBan: "",
            bannedUsers: this.admin.getBannedUsers()
        });
    }

    handleUnban = (userId) => {
        this.admin.unbanUser(userId);
        this.setState({
            bannedUsers: this.admin.getBannedUsers()
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <input type="text" placeholder="User ID" value={this.state.userIdToBan} onChange={this.handleInputChange} />
                    <Button variant="danger" type="button" onClick={this.handleBan}>BAN</Button>
                </div>
                <Table>
                    <thead className="thead-dark">
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.bannedUsers.map((user) => (
                            <BannedUser key={uid(user)} user={user} unban={this.handleUnban} />
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default AdminDashboard;