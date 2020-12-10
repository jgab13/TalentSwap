import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router-dom';
import {getSearchResults} from './../../actions/user.js';

class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: "",
            redirectObject: undefined
        };
        this.handleClick = this.handleClick.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    async handleClick(e){
        e.preventDefault();
        await getSearchResults(this, this.state.input);
    }

    renderRedirect() {
        if (this.state.redirectObject) {
            // console.log('redirecting to /Search')
            // console.log('searchBox:', this)
            return <Redirect to={this.state.redirectObject} />
        }
    };

    render(){
        return(
            <div>
                {this.renderRedirect()}
                <Form inline className='search-box'>
                    <Form.Control
                    id="keyword"
                    type="text"
                    placeholder="search courses or users"
                    className="mr-sm-2"
                    value={this.state.input}
                    onChange={(e) => this.setState({input: e.target.value })} />
                    <Button 
                    variant="outline-success" 
                    onClick={this.handleClick}>
                        search
                    </Button>
                </Form>
            </div>
        );
    }
}

export default SearchBox;