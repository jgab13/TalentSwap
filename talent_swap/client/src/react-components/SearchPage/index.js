import React from "react";
import "./styles.css";
import {Badge} from "react-bootstrap";


import Header from "./../Header"
import SearchTabs from "./../SearchTabs"
import CourseFilter from "./../SearchCourseFilter"
// import UserFilter from "./../SearchUserFilter"
import CourseResults from "./../SearchCourseResults"
import UserResults from "./../SearchUserResults"

// prepare hardcoded user and course data to render on the search page
import {hardcodedCourses} from "./../../courses/testcourses.js"
import UserManager from "./../../users/user-manager.js"
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
    return r_courses;
}


class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign({
            tab : "courses", 
        }, this.updateState()); // server call
        this.handleTabSelect = this.handleTabSelect.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newState = this.updateState();
        // console.log("prevState", prevState);
        // console.log("newState", newState);
        if (newState.keyword !== prevState.keyword 
            || (newState.courses.length !== prevState.courses.length
                || !newState.courses.every((value, index) => value === prevState.courses[index]))
                // || newState.cfilters !== prevState.cfilters
            )
        {
            this.setState(newState);
        }
    }

    updateState = () => {
        console.log(this.props);
        const keyword = this.props.location.state
            ? this.props.location.state.searchInput
            : undefined;
        let users = keyword // server call
            ? hardcodedUsers.filter((user) => 
                 (user.name.toLowerCase().match(keyword.toLowerCase())) 
                 || (user.development.toLowerCase().match(keyword.toLowerCase())) 
                 || (user.expertise.toLowerCase().match(keyword.toLowerCase())) 
            )
            : hardcodedUsers; 
        let courses = keyword // server call
            ? hardcodedCourses.filter((course) => 
                course.topic.toLowerCase().match(keyword.toLowerCase())
            )
            : hardcodedCourses;
        // apply course level filters, if any
        console.log("after search input changes to ", keyword, "courses include ", courses);
        const clfilters = this.props.location.state 
            ? this.props.location.state.levelFilters
            : undefined;
        // console.log("level filters include ", clfilters);
        courses = clfilters
            ? FilterCourseLevels(courses, clfilters)
            : courses;
        console.log("after applying level filters ", clfilters, "courses include ", courses);
        // apply course date filters, if any
        const cdfilters = this.props.location.state
            ? this.props.location.state.dateFilters
            : undefined;
        courses = cdfilters
            ? FilterCourseDates(courses, cdfilters)
            : courses;
        console.log("after applying date filters ", cdfilters, "courses include ", courses);
        // apply course size filters, if any
        const csfilters = this.props.location.state
            ? this.props.location.state.sizeFilters
            : undefined;
        courses = csfilters 
            ? FiltersCourseSizes(courses, csfilters)
            : courses
        console.log("after applying size filters ", csfilters, "courses include ", courses);
        return {
            keyword: keyword,
            users: users,
            courses: courses,
            cfilters: [].concat(clfilters).concat(cdfilters).concat(csfilters)
        };
    }

    handleTabSelect = (eventKey) => {
        this.setState({tab: eventKey});
    }

    render(){
        const users = this.state.users;
        const courses = this.state.courses;
        const tab = this.state.tab;
        const courseFilters = this.state.cfilters;
        let filter, results;
        // filter = (tab === "courses") ? <CourseFilter /> : <UserFilter />;
        filter = (tab === "courses") ? <CourseFilter /> : undefined;
        results = (tab === "courses") ? <CourseResults courses = {courses}/> : <UserResults users = {users}/>;
        return(
            <div className="SearchPage">
                <Header />
                <SearchTabs id="tab" handleTabSelect = {this.handleTabSelect} />
                
                <p > 
                    <span id="filterHeader">Filter by  </span> <br></br>
                    { courseFilters.map( (filter) => 
                        <Badge className ="filterLabel" variant = "success" >{filter}</Badge>
                        )
                    } 
                </p>
                
                {filter}
                {results}
            </div>
        )
    }
}




export default SearchPage;