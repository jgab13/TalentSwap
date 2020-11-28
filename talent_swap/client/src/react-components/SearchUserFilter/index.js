import React from "react";
import "./styles.css";

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class UserFilter extends React.Component{

    render(){
        return(
            <div className = "filterForm">
             
                <DropdownButton variant = "light" id="dropdown-role" title="Role">
                    <Dropdown.Item href="#/action-1">teacher</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">student</Dropdown.Item>
                </DropdownButton>
                <DropdownButton variant = "light" id="dropdown-rating" title="Rating">
                    <Dropdown.Item href="#/action-1">4-5</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">2-3</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">0-2</Dropdown.Item>
                </DropdownButton> 

                <DropdownButton variant = "light" id="dropdown-skills" title="Skills">
                    <Dropdown.Item href="#/action-1">full-stack</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">front-end</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">back-end</Dropdown.Item>
                </DropdownButton> 
            </div>
        );
    }
}

export default UserFilter;