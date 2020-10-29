import React from "react";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

class UserProfileField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            fieldName: this.props.fieldName,
            fieldValue: this.props.fieldValue
        };
        this.changeValue = this.props.changeValue;
    }

    toggleEdit = () => {
        if (this.state.editing) {
            this.changeValue(this.state.fieldValue);
        }
        this.setState(
            (state, props) => {
                return {editing: !state.editing}
            }
        );
    }

    handleInputChange = (event) => {
        this.setState({
            fieldValue: event.target.value
        });
    };

    render() {
        const fieldNameHeading = (
            <Container>
                <Row>
                    <Col><span>{this.state.fieldName}</span></Col>
                    <Col>
                        <Button variant="dark" onClick={this.toggleEdit}>
                            {this.state.editing ? "Save" : "Edit"}
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
        const fieldValueText = this.state.editing 
            ? <textarea type="text" value={this.state.fieldValue} onChange={this.handleInputChange}></textarea>
            : <div>{this.state.fieldValue}</div>;
        return (
            <Card>
                <Card.Header>
                    {fieldNameHeading}
                </Card.Header>
                <Card.Body>
                    {fieldValueText}
                </Card.Body>
            </Card>
        )
    }
}

export default UserProfileField;