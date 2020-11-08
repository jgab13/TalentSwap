import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        console.log("redirecting to search page");
        const keyword = document.querySelector("#keyword").value;
        console.log(keyword);
    }
    render(){
        return(
            <Form inline className='search-box'>
	            <FormControl id="keyword" type="text" placeholder="search" className="mr-sm-2" />
	            <Button variant="outline-success" href="/Search" onClick={this.handleClick}>search</Button>
	        </Form>
        );
    }
}

export default SearchBox;