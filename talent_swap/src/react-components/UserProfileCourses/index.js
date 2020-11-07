import React from "react";
import "./styles.css";
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class UserProfileCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectURL: ""
        };
        this.renderRedirect = this.renderRedirect.bind(this);
    }
    renderRedirect() {
        if (this.state.redirectURL) {
            return <Redirect to={this.state.redirectURL} />
        }
    }
    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Card>
                    <Card.Header>
                        {this.props.header}
                    </Card.Header>
                    <Card.Body>
                        <ListGroup>
                            <ListGroupItem className="courseLink" onClick={() => this.setState({redirectURL: "/DetailedCoursePage"})}>Introduction to Cognitive Science</ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default UserProfileCourses;