import React from "react";
import "./styles.css";
// import {Button} from "react-bootstrap";

import Header from "./../Header"
import SearchTabs from "./../SearchTabs"
import CourseFilter from "./../SearchCourseFilter"
import UserFilter from "./../SearchUserFilter"
import CourseResults from "./../SearchCourseResults"
import UserResults from "./../SearchUserResults"

// prepare hardcoded user and course data to render on the search page
import {hardcodedCourses} from "./../../courses/testcourses.js"
import UserManager from "./../../users/user-manager.js"
import { Badge } from "react-bootstrap";
const hardcodedUsers = [UserManager.getUserFromId(1), UserManager.getUserFromId(2)]

function FilterCourseLevels(curr_courses, filters){
    let r_courses = [];
    for (let f of filters){
        r_courses = r_courses.concat(curr_courses.filter(course =>
            course.level === f))
    }
    return r_courses;
}

function FilterCourseDates(curr_courses, filters){
    let r_courses = [];
    for (let f of filters){
        r_courses = r_courses.concat(curr_courses.filter(course =>
            f === "upcoming"
            ? course.starttime > Date.now()
            : course.starttime <= Date.now()))
    }
    return r_courses;
}

function FiltersCourseSizes(curr_courses, filters){
    let r_courses = [];
    for (let f of filters){
        r_courses = r_courses.concat(curr_courses.filter(course =>
            {switch(f){
                case 'one': 
                    // console.log(typeof(course.capacity))
                    return course.capacity === 1
                case 'small':
                    return 1 < course.capacity && course.capacity < 9
                case 'medium':
                    return 8 < course.capacity && course.capacity < 21
                case 'large':
                    return course.capacity > 20
                default:
                    return course
            }}))
    }
    console.log("before FilterCourseSizes() returns, courses include ", r_courses)
    return r_courses;
}


class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign({
            tab : "courses",
            // filtered: false
            cfilters: []
            // f_levels: [],
            // f_dates: [],
            // f_sizes: [],
        }, this.updateOnSearchKeywordChange());
        this.handleTabSelect = this.handleTabSelect.bind(this);
        // this.handleClick = this.handleClick.bind(this);

    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const newState = this.updateState();
    //     // console.log("prevState", prevState);
    //     // console.log("newState", newState);
    //     if (newState.keyword !== prevState.keyword 
    //         || (newState.courses.length !== prevState.courses.length
    //             || !newState.courses.every((value, index) => value === prevState.courses[index]))
    //             // || newState.cfilters !== prevState.cfilters
    //         )
    //     {
    //         this.setState(newState);
    //     }
    // }

    componentDidUpdate(prevProps, prevState){
        // check whether search keywords have changed 
        const newSearchState = this.updateOnSearchKeywordChange();
        if ( newSearchState.keyword !== prevState.keyword){
            this.setState(newSearchState)
        }
        const newCourseFilterState = this.updateOnCourseFiltersChange();
        if ( !prevState.cfilters
            || newCourseFilterState.cfilters.length !== prevState.cfilters.length
            || !newCourseFilterState.cfilters.every( (val, ind) => val === prevState.cfilters[ind]))
            {
                this.setState(newCourseFilterState)
        }
    }

    updateOnSearchKeywordChange = () => {
        console.log("a new SEARCH ", this.props);
        const keyword = this.props.location.state
            ? this.props.location.state.searchInput
            : undefined;
        let users = keyword
            ? hardcodedUsers.filter((user) => 
                 (user.name.toLowerCase().match(keyword.toLowerCase())) 
                 || (user.development.toLowerCase().match(keyword.toLowerCase())) 
                 || (user.expertise.toLowerCase().match(keyword.toLowerCase())) 
            )
            : hardcodedUsers;
        let courses = keyword
            ? hardcodedCourses.filter((course) => 
                course.topic.toLowerCase().match(keyword.toLowerCase())
            )
            : hardcodedCourses;
        console.log("after search input changed to ", keyword, "courses include ", courses);
        return {
            keyword: keyword,
            users: users,
            courses: courses,
        };
    }

    updateOnCourseFiltersChange = () => {
        let courses = this.state.keyword
            ? this.state.courses
            : hardcodedCourses;
        console.log("before applying any filters, courses include ", courses);
        // apply course level filters, if any
        const clfilters = this.props.location.state 
            ? this.props.location.state.levelFilters
            : [];
        // console.log("level filters include ", clfilters);
        courses = clfilters && clfilters.length
            ? FilterCourseLevels(courses, clfilters)
            : courses;
        console.log("after applying level filters ", clfilters, "courses include ", courses);
        // apply course date filters, if any
        const cdfilters = this.props.location.state
            ? this.props.location.state.dateFilters
            : [];
        courses = cdfilters && cdfilters.length
            ? FilterCourseDates(courses, cdfilters)
            : courses;
        console.log("after applying date filters ", cdfilters, "courses include ", courses);
        // apply course size filters, if any
        const csfilters = this.props.location.state
            ? this.props.location.state.sizeFilters
            : [];
        courses = csfilters && csfilters.length
            ? FiltersCourseSizes(courses, csfilters)
            : courses
        console.log("after applying size filters ", csfilters, "courses include ", courses);
        const newFilters = [].concat(clfilters).concat(cdfilters).concat(csfilters);
        return {
            courses: courses,
            // cfilters: this.state.cfilters && this.state.cfilters.length
            //     ? this.state.cfilters.concat(newFilters)
            //     : newFilters
            cfilters: newFilters
            // f_levels: clfilters,
            // f_dates: cdfilters,
            // f_sizes: csfilters
        }
    }


    handleTabSelect = (eventKey) => {
        this.setState({tab: eventKey});
    }

    // handleClick(){
    //     this.setState({
    //         f_levels: [],
    //         f_dates: [],
    //         f_sizes: [],
    //     })
    // }

    render(){
        const users = this.state.users;
        const courses = this.state.courses;
        const tab = this.state.tab;
        const filters = this.state.cfilters;

        console.log(this.state)
        let filter, results;
        filter = (tab === "courses") ? <CourseFilter /> : <UserFilter />;
        results = (tab === "courses") ? <CourseResults courses = {courses}/> : <UserResults users = {users}/>;
        return(
            <div className="SearchPage">
                <Header />
                <SearchTabs id="tab" handleTabSelect = {this.handleTabSelect} />
                <p id="filterHeader">
                    <span> Filter by </span> <br></br>
                    {filters.map( (filter) =>
                        <Badge id="filterLabel" variant="success" key={filter}>{filter}</Badge>
                    )}
                </p>
                
                {filter}
                {/* <Button variant="success" id="clear-filter" onClick={this.handleClick}>Clear filters</Button> */}
                {results}
            </div>
        )
    }
}




export default SearchPage;