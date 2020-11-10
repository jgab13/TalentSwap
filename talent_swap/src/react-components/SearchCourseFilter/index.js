import React from "react";
import "./styles.css";
import {Redirect} from "react-router-dom";
import {Dropdown, DropdownButton, Button } from "react-bootstrap";


class CourseFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            levels: [],
            dates: [],
            sizes: [],
            // levels: this.props.f_levels,
            // dates: this.props.f_datas,
            // sizes: this.props.f_sizes,
            redirectObject: undefined
        }

        this.handleLevelFilter = this.handleLevelFilter.bind(this);
        this.handleDateFilter = this.handleDateFilter.bind(this);
        this.handleSizeFilter = this.handleSizeFilter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    handleClick(){
        this.setState({
            levels: [],
            dates: [],
            sizes: [],
            redirectObject: {
                pathname: "/Search",      
            }
        })
    }

    handleLevelFilter = (e) => {
        const ek = e.target.id
        if (!this.state.levels.includes(ek)) {
            const newFilters = [].concat(this.state.levels).concat([ek]);
            this.setState({
                levels: newFilters,
                redirectObject: {
                    pathname: "/Search",
                    state: {
                        levelFilters: newFilters
                        // dateFilters: this.state.redirectObject.dateFilters,
                        // sizeFilters: this.state.redirectObject.sizeFilters
                    }
                }
            })
        }
    }

    handleDateFilter = (e) => {
        const ek = e.target.id
        if (!this.state.dates.includes(ek)){ 
            const newFilters = [].concat(this.state.dates).concat([ek]);
            this.setState({
                dates: newFilters,
                redirectObject: {
                    pathname: "/Search",
                    state: {dateFilters: newFilters}
                }
            })
        }
    }


    handleSizeFilter = (e) => {
        const ek = e.target.id
        if (!this.state.sizes.includes(ek)){ 
            const newFilters = [].concat(this.state.sizes).concat([ek]);
            this.setState({
                sizes: newFilters,
                redirectObject: {
                    pathname: "/Search",
                    state: {sizeFilters: newFilters}
                }
            })
        }
    }

    renderRedirect() {
        if (this.state.redirectObject) {
            console.log(this.state.redirectObject);
            return <Redirect to={this.state.redirectObject} />
        }
    }

    render(){
        // console.log(this.state)
        return(
            <div className="filterForm">
                {this.renderRedirect()}
                <DropdownButton variant = "light" id="dropdown-level" title="Level">
                    <Dropdown.Item id="beginner" onClick = {this.handleLevelFilter}>
                        beginner</Dropdown.Item>
                    <Dropdown.Item id="intermediate" onClick = {this.handleLevelFilter}>
                        intermediate</Dropdown.Item>
                    <Dropdown.Item id="advanced" onClick = {this.handleLevelFilter}> 
                        advanced</Dropdown.Item>
                    <Dropdown.Item id="all-level" onClick = {this.handleLevelFilter}> 
                        all-level</Dropdown.Item>
                </DropdownButton>

                <DropdownButton variant = "light" id="dropdown-availability" title="Availability">
                    <Dropdown.Item id = "upcoming" onClick={this.handleDateFilter}>
                        upcoming </Dropdown.Item>
                    <Dropdown.Item id ="past" onClick={this.handleDateFilter}>
                        past</Dropdown.Item>
                </DropdownButton> 

                <DropdownButton variant = "light" id="dropdown-class-size" title="Class Size">
                    <Dropdown.Item id="one" onClick={this.handleSizeFilter}>
                        one-on-one</Dropdown.Item>
                    <Dropdown.Item id="small" onClick={this.handleSizeFilter}>
                        small (2-8)</Dropdown.Item>
                    <Dropdown.Item id="medium" onClick={this.handleSizeFilter}>
                        medium (9-20)</Dropdown.Item>
                    <Dropdown.Item id="large" onClick={this.handleSizeFilter}>
                        large (20+)</Dropdown.Item>
                </DropdownButton> 
                {/* <br></br> */}
                
                <Button variant="success" id="clear-filter" onClick={this.handleClick}>
                    Clear Filters</Button>
            </div>
        );
    }

}

export default CourseFilter;