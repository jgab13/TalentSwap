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
        this.handleClick = this.handleClick.bind(this);
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
        this.setState({
            levels: [],
            dates: [],
            sizes: [],
            redirectObject: undefined
        })
    }

    handleLevelFilter = (e) => {
        const ek = e.target.id
    //     console.log("ek is of type", typeof(ek))
    // handleLevelFilter = (ek) => {
    //     console.log("ek is of type", typeof(ek), ek)
        if (!this.state.levels.includes(ek)) 
            const newFilters = this.state.levels.concat([ek])
            this.setState({
                levels: newFilters,
                redirectObject: {
                    pathname: "/Search",
                    state: {levelFilters: newFilters}
                }
            })
        // console.log("after handling level filter selection, ", this.state)
    }

    handleDateFilter = (e) => {
        const ek = e.target.id
        // console.log("ek is of type", typeof(ek))
        if (!this.state.dates.includes(ek)) 
            const newFilters = this.state.dates.concat([ek]),
            this.setState({
                dates: newFilters,
                redirectObject: {
                    pathname: "/Search",
                    state: {dateFilters: newFilters}
                }
            })
    }


    handleSizeFilter = (ek) => {
        // console.log("ek is of type", typeof(ek))
        const ek = e.target.id
        if (!this.state.sizes.includes(ek)) 
            const newFilters = this.state.sizes.concat([ek]),
            this.setState({
                sizes: newFilters,
                redirectObject: {
                    pathname: "/Search",
                    state: {sizeFilters: newFilters}
                }
            })
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
            console.log(this.state.redirectObject);
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

                <DropdownButton onClick = {this.handleSizeFilter}
                    variant = "light" id="dropdown-class-size" title="Class Size">
                    <Dropdown.Item id="one">one-on-one</Dropdown.Item>
                    <Dropdown.Item id="small">small (2-8)</Dropdown.Item>
                    <Dropdown.Item id="medium">medium (9-20)</Dropdown.Item>
                    <Dropdown.Item id="large">large (20+)</Dropdown.Item>
                </DropdownButton> 
                {/* <br></br> */}
                
                <Button variant="success" id="clear-filter" onClick={this.handleClick}>clear filters</Button>
            </div>
        );
    }

}

export default CourseFilter;