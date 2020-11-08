import React from "react";
import Nav from "react-bootstrap/Nav";

// class SearchTabs extends React.Component{
function SearchTabs(props){
    
    // render(){
        return(
            <Nav variant="tabs" defaultActiveKey="courses" onClick={props.onClick}>
                <Nav.Item>
                    <Nav.Link eventKey="courses" >Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="users" >Users</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    // }
}

export default SearchTabs;