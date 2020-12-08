import React from "react";
import { UserContext } from "../../react-contexts/user-context";
import { Button } from 'react-bootstrap';

class ImageUploader extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.changeValue = this.props.changeValue;
    }

    clickHandler = async (event) => {
        const fileInput = event.target.parentElement.querySelector("input[type=\"file\"]");
        if (fileInput.files) {
            await this.changeValue(fileInput.files[0]);
        }
    }

    render() {
        return (
            <div>
                <input type="file" />
                <Button variant="success" onClick={this.clickHandler}>Upload</Button>
            </div>
        )
    }
}

export default ImageUploader;