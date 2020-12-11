import React from "react";
import { uid } from "react-uid";
import Header from "./../Header";
import BannedUser from "./../BannedUser";
import WebsiteStatus from './WebsiteStatus'
import './styles.css';
import { Button, Table } from 'react-bootstrap';
import { UserContext } from "../../react-contexts/user-context";
import { Redirect } from "react-router-dom";

class AdminDashboard extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            usernameToBan: "",
            bannedUsers: undefined
        }
    }

    async componentDidMount() {
        const {currentUser} = this.context;
        if (currentUser && currentUser.userType === "admin") {
            const bannedUsers = await currentUser.getBannedUsers();
            this.setState({bannedUsers: bannedUsers});
        }
    }

    handleInputChange = (event) => {
        this.setState({
            usernameToBan: event.target.value
        });
    };

    handleBan = async (event) => {
        const {currentUser} = this.context;
        await currentUser.banUser(this.state.usernameToBan);
        const bannedUsers = await currentUser.getBannedUsers();
        this.setState({
            usernameToBan: "",
            bannedUsers: bannedUsers
        });
    }

    handleUnban = async (username) => {
        const {currentUser} = this.context;
        await currentUser.unbanUser(username);
        const bannedUsers = await currentUser.getBannedUsers();
        this.setState({
            usernameToBan: "",
            bannedUsers: bannedUsers
        });
    }

    render() {
        const {currentUser} = this.context;
        if (currentUser === null || currentUser.userType !== "admin") {
            return <Redirect to="/" />
        }
        if (!this.state.bannedUsers) {
            return <div></div>
        }
        return (
            <div>
                <Header />
                <div className="user-control">
                    <h4> User Control </h4>
                    <input type="text" placeholder="Username" value={this.state.usernameToBan} onChange={this.handleInputChange} />
                    <Button variant="danger" type="button" onClick={this.handleBan}>BAN</Button>
                </div>
                <Table className="user-control">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.bannedUsers.map((user) => (
                            <BannedUser key={uid(user)} user={user} unban={this.handleUnban} />
                        ))}
                    </tbody>
                </Table>
                <hr />
                <WebsiteStatus id="website-status" />
            </div>
        )
    }
}

export default AdminDashboard;