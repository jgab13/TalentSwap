import React from "react";
import "./styles.css";
import {Redirect} from "react-router-dom";
import {Dropdown, DropdownButton, Button } from "react-bootstrap";


class CourseFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filters: [],
            redirectObject: undefined
        }

        this.handleLevelFilter = this.handleLevelFilter.bind(this);
        this.handleDateFilter = this.handleDateFilter.bind(this);
        this.handleSizeFilter = this.handleSizeFilter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.setRenderObject = this.setRenderObject.bind(this);
    }

    setRenderObject(newFilters){
        this.setState({
            redirectObject: {
                pathname: "/Search",
                state: {courseFilters: newFilters}
            }
        })
    }

    handleClick(){
        this.setState({filters: []})
        this.setRenderObject([])
    }

    handleLevelFilter(ek){
        // SearchPage updateState will parse it based on this particular format
        const newFilters = this.state.filters.concat([`level:${ek}`]) 
        this.setState({filters: newFilters})
        this.setRenderObject(newFilters)
    }

    handleDateFilter(ek){
        const newFilters = this.state.filters.concat([`date:${ek}`])
        this.setState({filters: newFilters})
        this.setRenderObject(newFilters)
    }

    handleSizeFilter(ek){
        const newFilters = this.state.filters.concat([`size:${ek}`])
        this.setState({filters: newFilters})
        this.setRenderObject(newFilters)
    }

    renderRedirect() {
        if (this.state.redirectObject) {
            return <Redirect to={this.state.redirectObject} />
        }
    };

    render(){
        return(
            <div className="filterForm">
                {this.renderRedirect()}
                <DropdownButton onSelect = {(eventKey) => this.handleLevelFilter(eventKey)} 
                    variant = "light" id="dropdown-level" title="Level">
                    <Dropdown.Item eventKey="beginner">beginner</Dropdown.Item>
                    <Dropdown.Item eventKey="intermediate">intermediate</Dropdown.Item>
                    <Dropdown.Item eventKey="advanced">advanced</Dropdown.Item>
                    <Dropdown.Item eventKey="all-level">all-level</Dropdown.Item>
                </DropdownButton>
                <DropdownButton onSelect = {(eventKey) => this.handleDateFilter(eventKey)} 
                    variant = "light" id="dropdown-availability" title="Availability">
                    <Dropdown.Item eventKey="upcoming">upcoming </Dropdown.Item>
                    <Dropdown.Item eventKey="past<">past</Dropdown.Item>
                </DropdownButton> 

                <DropdownButton onSelect = {(eventKey) => this.handleSizeFilter(eventKey)}
                    variant = "light" id="dropdown-class-size" title="Class Size">
                    <Dropdown.Item eventKey="one">one-on-one</Dropdown.Item>
                    <Dropdown.Item eventKey="small">small (2-8)</Dropdown.Item>
                    <Dropdown.Item eventKey="medium">medium (9-20)</Dropdown.Item>
                    <Dropdown.Item eventKey="large">large (20+)</Dropdown.Item>
                </DropdownButton> 
                {/* <br></br> */}
                
                <Button variant="success" id="clear-filter" onClick={this.handleClick}>clear filters</Button>
            </div>
        );
    }

}

export default CourseFilter;