import React from "react";
import Nav from "react-bootstrap/Nav";

class SearchTabs extends React.Component{
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(ek){
        this.props.handleTabSelect(ek);
    }

    render(){
        return(
            <Nav variant="tabs" defaultActiveKey="courses" onSelect={(eventKey) =>this.handleSelect(eventKey)}>
                <Nav.Item>
                    <Nav.Link eventKey="courses" >Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="users" >Users</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

export default SearchTabs;