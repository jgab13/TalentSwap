import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router-dom';
import {getSearchedCourses} from './../../actions/course.js';


class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: "",
            redirectObject: undefined
            // redirectURL: ""
        };
        this.handleClick = this.handleClick.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    async handleClick(e){
        e.preventDefault();
       
        await getSearchedCourses(this, this.state.input);
        // await getSearchedUsers(this.props.app, this.state.input);
        // const url = this.state.input ? '/Search?query='+this.state.input : '/Search';
        // // setTimeout(console.log("After searching, app has the following states", this.props.app, 3000))
        // this.setState({
        //     redirectObject: {
        //         pathname: url,
        //         state: {searchKeyword: this.state.input},
        //     }
        // });
        
        // this.setState({
        //     redirectObject: {
        //         pathname: url,
        //         state: {searchKeyword: this.state.input},
        //     }
        //     // redirectURL: url
        // });
    }


    renderRedirect() {
        // if (this.state.redirectURL) {
        //     return <Redirect to={this.state.redirectURL} />
        // }
        if (this.state.redirectObject 
            // && this.state.redirectObject.state.searchedCourses
            // && this.state.redirectObject.state.searchKeyword
            // && this.state.redirectObject.pathname
            ) {
            console.log('redirecting to /Search')
            console.log('searchBox:', this)
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