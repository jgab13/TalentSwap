import React from "react";
import "./styles.css";
import {Form, Button} from "react-bootstrap";

import Header from "./../Header"
import SearchTabs from "./../SearchTabs"
import CourseResults from "./../SearchCourseResults"
import UserResults from "./../SearchUserResults"

const helpers = require("./helpers.js") 


class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign({
            // tab : "courses"

            tab : "courses", 
            cfilters: {level: [], availability: [], size:[]}
            // teachers_only: false
            //  {
            //     level: [],
            //     availability: [],
            //     size: []
            // }
        }, this.updateState()); 
        this.handleTabSelect = this.handleTabSelect.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleCfilterCheck = this.handleCfilterCheck.bind(this);
        this.applyCfilters = this.applyCfilters.bind(this);
        this.clearCfilters = this.clearCfilters.bind(this);
        this.handleUfilterCheck = this.handleUfilterCheck.bind(this);
    }

    handleUfilterCheck = (e) => {
        const toggle = document.getElementById(e.target.id)
        if (toggle.checked){
            this.setState({displayedUsers: helpers.FilterTeachers(this.state.users, this.state.keyword) })
        } else {
            this.setState({displayedUsers: this.state.users})
        }
    }
    applyCfilters = () => {
        const cfilters = this.state.cfilters
        let displayedCourses = this.state.courses
        if (cfilters.level.length) {
            displayedCourses = helpers.FilterCourseLevels(displayedCourses, cfilters.level)
            // console.log('displayedCourses after level filters ', displayedCourses)
        }
        if (cfilters.availability.length) {
            displayedCourses = helpers.FilterCourseDates(displayedCourses, cfilters.availability)
            // console.log('displayedCourses after availability filters', displayedCourses)
        }

        if (cfilters.size.length) {
            displayedCourses = helpers.FiltersCourseSizes(displayedCourses, cfilters.size)
            // console.log('displayedCourses after size filters', displayedCourses)
        }
        this.setState({displayedCourses: displayedCourses})
    }

    clearCfilters = () => {
        const dummy = {...this.state}
        dummy.cfilters = {level: [], availability: [], size:[]}
        dummy.displayedCourses = dummy.courses
        this.setState(dummy)
        if (this.state.tab === "users") {
            const toggle = document.getElementById('u1')
            toggle.checked = false
        } else {
            const idList = ["c1:Beginner", "c1:Intermediate", "c1:Advanced", "c1:All Level",
                "c2:Past", "c2:Upcoming", 
                'c3:One-on-One', 'c3:Small (2-8)', 'c3:Medium (9-20)', 'c3:Large (20+)']
            idList.forEach(id => {
                let cb = document.getElementById(id)
                cb.checked = false
            })
        }
    }

    handleCfilterCheck = (e) => {
        const checkbox = document.getElementById(e.target.id)
        // if (checkbox.checked) {
        //     console.log('checked')
        // }
        const arr = e.target.id.split(':')
        const cat = arr[0], tag = arr[1]
        const dummy = {...this.state}
        let arrToChange
        switch(cat) {
            case 'c1': 
                arrToChange = dummy.cfilters.level
                break
            case 'c2':
                arrToChange = dummy.cfilters.availability
                break
            case 'c3':
                arrToChange = dummy.cfilters.size
                break
        }
        if (checkbox.checked) {
            arrToChange.push(tag)
        } else {
            arrToChange.splice(arrToChange.indexOf(tag), 1)
        }
        this.setState(dummy)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const newState = this.updateState();
        // console.log("prevState", prevState);
        // console.log("newState", newState);
        if (newState.keyword !== prevState.keyword 
            // || (newState.courses.length !== prevState.courses.length
            //     || !newState.courses.every((value, index) => value === prevState.courses[index]))
                // && newState.cfilters !== prevState.cfilters
            )
        {
            this.clearCfilters();
            this.setState(newState);
            // const idList = ["c1:Beginner", "c1:Intermediate", "c1:Advanced", "c1:All Level",
            // "c2:Past", "c2:Upcoming", 
            // 'c3:One-on-One', 'c3:Small (2-8)', 'c3:Medium (9-20)', 'c3:Large (20+)']
            // idList.forEach(id => {
            //     let cb = document.getElementById(id)
            //     cb.checked = false
            // })
        }
    }
    

    updateState = () => {
        
        console.log('updating search page...')
        const keyword = this.props.location.state.searchKeyword
        const courses = this.props.location.state.searchedCourses
        const users = this.props.location.state.searchedUsers
        return {
                keyword: keyword,
                courses: courses,
                displayedCourses: courses,
                users: users,
                displayedUsers: users
                // displayedCourses: courses,
                // cfilters: {
                //     level: [],
                //     availability: [],
                //     size: []
                // }
        }
    }
  
    handleTabSelect = (eventKey) => {
        this.setState({tab: eventKey});
    }

    render(){
        const users = this.state.displayedUsers;
        const courses = this.state.displayedCourses;
        console.log('the states of SearchPage comp are', this.state)
        const tab = this.state.tab;
        let results;
        results = (tab === "courses") ? <CourseResults courses = {courses}/> : <UserResults users = {users}/>;
        if (tab === "users") {
            return(
                <div className="SearchPage">
                    <Header />
                    <SearchTabs id="tab" handleTabSelect = {this.handleTabSelect} /> 
                    <Form>
                        <div className="mb-3"> 
                            <Form.Check inline label={"only show teachers"} type={'radio'} className={'ufilter'}
                            id={`u1`} onClick={this.handleUfilterCheck}/>
                        </div>
                    </Form>
                    {results}
                </div>
            )
        } else {
            return(
                <div className="SearchPage">
                    <Header />
                    <SearchTabs id="tab" handleTabSelect = {this.handleTabSelect} /> 
                    <p id="filterHeader"> Filter by<br></br></p>
                    <Form>
                    <div className="mb-3"> 
                    <span> Level </span>
                    {['Beginner', 'Intermediate', 'Advanced', 'All Level'].map( level => (
                        <Form.Check inline label={level} type={'checkbox'} className={'cfilter'}
                        id={`c1:${level}`} onClick={this.handleCfilterCheck}/>
                    ))}
                    </div>
                    <div className="mb-3"> 
                    <span> Availability </span>
                    {['Past', 'Upcoming'].map( a => (
                        <Form.Check inline label={a} type={'checkbox'} className={'cfilter'}
                        id={`c2:${a}`} onClick={this.handleCfilterCheck}/>
                    ))}
                    </div>
                    <div className="mb-3"> 
                    <span> Class Size </span>
                    {['One-on-One', 'Small (2-8)', 'Medium (9-20)', 'Large (20+)'].map( s => (
                        <Form.Check inline label={s} type={'checkbox'} className={'cfilter'}
                        id={`c3:${s}`} onClick={this.handleCfilterCheck}/>
                    ))}
                    </div>
                    <Button variant="success" id="apply-filter" onClick={this.applyCfilters}>
                    Apply Filters</Button>
                    <Button variant="secondary" id="clear-filter" onClick={this.clearCfilters}>
                    Clear Filters</Button>
                </Form>
                    {results}
            </div>
            )
        }  
    }
}


export default SearchPage;