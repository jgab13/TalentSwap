import React from "react";

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
            <div>
                <span>{this.state.fieldName}</span>
                <button onClick={this.toggleEdit}>
                    {this.state.editing ? "Save" : "Edit"}
                </button>
            </div>
        );
        const fieldValueText = this.state.editing 
            ? <input type="text" value={this.state.fieldValue} onChange={this.handleInputChange} />
            : <div>{this.state.fieldValue}</div>;
        return (
            <div>
                {fieldNameHeading}
                {fieldValueText}
            </div>
        )
    }
}

export default UserProfileField;