import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log("searching the database...")
        this.props.handleSearch(document.querySelector("#keyword").value);
    }

    render(){
        return(
            <Form inline className='search-box'>
	            <Form.Control id="keyword" type="text" placeholder="search courses or users" className="mr-sm-2" />
	            <Button variant="outline-success" href="/Search" onClick={this.handleClick}>search</Button>
	        </Form>
        );
    }
}

export default SearchBox;