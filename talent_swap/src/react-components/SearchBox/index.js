import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router-dom';


class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: "",
            redirectObject: undefined
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    handleClick(e){
        console.log("searching the database...")
        e.preventDefault();
        this.setState({
            redirectObject: {
// <<<<<<< HEAD
//                 // pathname: `/Search/keyword=${this.state.input}`,
//                 pathname: `/Search`,
//                 state: {searchInput: this.state.input}
// =======
                pathname: '/Search',
                state: {searchInput: this.state.input},
                from: "/MessageCenter"
// >>>>>>> c4b33360f45488ea403f3f9aa491481974183396
            }
        });
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    };

    renderRedirect() {
        if (this.state.redirectObject) {
            console.log("renderRedirect invoked")
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
                    onChange={this.handleChange} />
                    <Button variant="outline-success" onClick={this.handleClick}>search</Button>
                </Form>
            </div>
        );
    }
}

export default SearchBox;