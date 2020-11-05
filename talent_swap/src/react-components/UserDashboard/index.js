import React from "react";
import {UserContext} from "./../../react-contexts/user-context";
import Header from "./../Header";
import { ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import UserProfile from "./../../react-components/UserProfile";

class UserDashboard extends React.Component {
    render() {
        return (
            <UserProfile />
        )
    }
}

export default UserDashboard;