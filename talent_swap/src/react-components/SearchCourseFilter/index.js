import React from "react";
import "./styles.css";

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class CourseFilter extends React.Component{
    constructor(props){
        super(props);
        // this.handleLevelFilter = this.handleLevelFilter.bind(this);
        // this.handleDateFilter = this.handleDateFilter.bind(this);
        // this.handleSizeFilter = this.handleSizeFilter.bind(this);
    }

    handleLevelFilter(ek){
        // this.props.handleLevelFilter(ek);
        console.log("select ", ek)
    }

    render(){
        return(
            <div className="filterForm">
                <DropdownButton onSelect = {(eventKey) => this.handleLevelFilter(eventKey)} variant = "light" id="dropdown-level" title="Level">
                    <Dropdown.Item eventKey="beginner">beginner</Dropdown.Item>
                    <Dropdown.Item eventKey="intermediate">intermediate</Dropdown.Item>
                    <Dropdown.Item eventKey="advanced">advanced</Dropdown.Item>
                    <Dropdown.Item eventKey="all-level">all-level</Dropdown.Item>
                </DropdownButton>
                <DropdownButton variant = "light" id="dropdown-availability" title="Availability">
                    <Dropdown.Item eventKey="upcoming">upcoming </Dropdown.Item>
                    <Dropdown.Item eventKey="past<">past</Dropdown.Item>
                </DropdownButton> 

                <DropdownButton variant = "light" id="dropdown-class-size" title="Class Size">
                    <Dropdown.Item eventKey="one">one-on-one</Dropdown.Item>
                    <Dropdown.Item eventKey="small">small (2-8)</Dropdown.Item>
                    <Dropdown.Item eventKey="medium">medium (9-20)</Dropdown.Item>
                    <Dropdown.Item eventKey="large">large (20+)</Dropdown.Item>
                </DropdownButton> 
            </div>
        );
    }

}

export default CourseFilter;