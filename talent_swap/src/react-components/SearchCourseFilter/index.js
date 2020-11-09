import React from "react";
import "./styles.css";
import {Redirect} from "react-router-dom";
import {Dropdown, DropdownButton, Button } from "react-bootstrap";


class CourseFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // filters: {
            //     level: [],
            //     date: [],
            //     size: []
            // },
            levels: [],
            dates: [],
            sizes: [],
            redirectObject: undefined
        }

        this.handleLevelFilter = this.handleLevelFilter.bind(this);
        this.handleDateFilter = this.handleDateFilter.bind(this);
        // this.handleSizeFilter = this.handleSizeFilter.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        // this.setRenderObject = this.setRenderObject.bind(this);
    }

    // handleLevelFilter = (ek) => {
    //     this.props.handleCourseFilters("level", ek)
    // }
    // setRenderObject(newFilters){
    //     this.setState({
    //         redirectObject: {
    //             pathname: "/Search",
    //             state: {courseFilters: newFilters}
    //         }
    //     })
    // }

    handleClick(){
        this.setState({filters: []})
        this.setRenderObject([])
    }

    handleLevelFilter = (e) => {
        const ek = e.target.id
        console.log("ek is of type", typeof(ek))
        if (!this.state.levels.includes(ek)) 
            this.setState({
                levels: this.state.levels.concat([ek]),
                redirectObject: {
                    pathname: "/Search",
                    state: {levelFilters: this.state.levels}
                }
            })
        // console.log("after handling level filter selection, ", this.state)
    }

    handleDateFilter = (ek) => {
        console.log("ek is of type", typeof(ek))
        if (!this.state.dates.includes(ek)) 
            this.setState({
                dates: this.state.dates.concat([ek]),
                redirectObject: {
                    pathname: "/Search",
                    state: {dateFilters: this.state.dates}
                }
            })
        console.log("after handling date filter selection, ", this.state)
    }


    handleSizeFilter = (ek) => {
        console.log("ek is of type", typeof(ek))
        if (!this.state.sizes.includes(ek)) 
            this.setState({
                sizes: this.state.sizes.concat([ek]),
                redirectObject: {
                    pathname: "/Search",
                    state: {sizeFilters: this.state.sizes}
                }
            })
        console.log("after handling size filter selection, ", this.state)
    }
    // handleLevelFilter(ek){
    //     // SearchPage updateState will parse it based on this particular format
    //     const newFilters = this.state.filters.concat([`level:${ek}`]) 
    //     this.setState({filters: newFilters})
    //     this.setRenderObject(newFilters)
    // }

    // handleDateFilter(ek){
    //     const newFilters = this.state.filters.concat([`date:${ek}`])
    //     this.setState({filters: newFilters})
    //     this.setRenderObject(newFilters)
    // }

    // handleSizeFilter(ek){
    //     const newFilters = this.state.filters.concat([`size:${ek}`])
    //     this.setState({filters: newFilters})
    //     this.setRenderObject(newFilters)
    // }

    renderRedirect() {
        if (this.state.redirectObject) {
            return <Redirect to={this.state.redirectObject} />
        }
    }

    render(){
        return(
            <div className="filterForm">
                {this.renderRedirect()}
            
                <DropdownButton 
                    variant = "light" id="dropdown-level" title="Level">
                    <Dropdown.Item id="beginner" onClick = {this.handleLevelFilter}>
                        beginner</Dropdown.Item>
                    <Dropdown.Item id="intermediate" onClick = {this.handleLevelFilter}
                        >intermediate</Dropdown.Item>
                    <Dropdown.Item id="advanced" onClick = {this.handleLevelFilter} 
                        >advanced</Dropdown.Item>
                    <Dropdown.Item id="all-level" onClick = {this.handleLevelFilter} 
                        >all-level</Dropdown.Item>
                </DropdownButton>
                <DropdownButton onClick={this.handleDateFilter}
                    variant = "light" id="dropdown-availability" title="Availability">
                    <Dropdown.Item id = "upcoming">upcoming </Dropdown.Item>
                    <Dropdown.Item id ="past">past</Dropdown.Item>
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