import React from "react";
import "./styles.css";

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class CourseFilter extends React.Component{

    render(){
        return(
            <div className="filterForm">
                
                <DropdownButton variant = "light" id="dropdown-level" title="Level">
                    <Dropdown.Item href="#/action-1">beginner</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">intermediate</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">advanced</Dropdown.Item>
                    <Dropdown.Item href="#/action-4">all-level</Dropdown.Item>
                </DropdownButton>
                <DropdownButton variant = "light" id="dropdown-availability" title="Availability">
                    <Dropdown.Item href="#/action-1">upcoming, enroll now</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">upcoming, waitlist</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Past</Dropdown.Item>
                </DropdownButton> 

                <DropdownButton variant = "light" id="dropdown-class-size" title="Class Size">
                    <Dropdown.Item href="#/action-1">one-on-one</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">small (2-10)</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">medium (11-20)</Dropdown.Item>
                    <Dropdown.Item href="#/action-4">large (30+)</Dropdown.Item>
                </DropdownButton> 
            </div>
        );
    }

}

export default CourseFilter;