import React from "react";
import "./styles.css";


import Header from "./../Header"
import SearchTabs from "./../SearchTabs"
import CourseFilter from "./../SearchCourseFilter"
import UserFilter from "./../SearchUserFilter"
import CourseResults from "./../SearchCourseResults"
import UserResults from "./../SearchUserResults"

// prepare hardcoded user and course data to render on the search page
import {hardcodedCourses} from "./../../courses/testcourses.js"
import UserManager from "./../../users/user-manager.js"
const hardcodedUsers = [UserManager.getUserFromId(1), UserManager.getUserFromId(2)]


function FilterCourses(curr_courses, cfilters){
    let r_courses = [];
    for (let f of cfilters){
        const filter = f.substring(0, f.indexOf(":"))
        const key = f.substring(f.indexOf(":") + 1);
        console.log(filter, key);
        console.log(curr_courses);
        switch (filter) {
            case 'level':
                r_courses = r_courses.concat(curr_courses.filter(course =>
                    course.level === key))
                break;
            case 'date':
                // filter based on starttime
                break;
            case 'size':
                // filter based on capacity
                break;
            default:
                break;
          }
    }
    return r_courses;
}


class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign({
            tab : "courses", 
        }, this.updateState());
        this.handleTabSelect = this.handleTabSelect.bind(this);
        // this.handleCourseFilter = this.handleCourseFilter.bind(this);
        // this.handleLevelFilter = this.handleLevelFilter.bind(this);
        // this.handleDateFilter = this.handleDateFilter.bind(this);
        // this.handleSizeFilter = this.handleSizeFilter.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newState = this.updateState();
        if (newState.keyword !== prevState.keyword) {
            this.setState(newState);
        }
    }

    updateState = () => {
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
        const cfilters = this.props.location.state 
            ? this.props.location.state.courseFilters
            : undefined;
        console.log(cfilters);
        courses = cfilters
            ? FilterCourses(courses, cfilters)
            : courses;
        return {
            keyword: keyword,
            users: users,
            courses: courses
        };
    }

    handleTabSelect = (eventKey) => {
        this.setState({tab: eventKey});
    }

    render(){
        const users = this.state.users;
        const courses = this.state.courses;
        const tab = this.state.tab;
        let filter, results;
        filter = (tab === "courses") ? <CourseFilter /> : <UserFilter />;
        results = (tab === "courses") ? <CourseResults courses = {courses}/> : <UserResults users = {users}/>;
        return(
            <div className="SearchPage">
                <Header />
                <SearchTabs id="tab" handleTabSelect = {this.handleTabSelect} />
                <p id="filterHeader">Filter by</p>
                {filter}
                {results}
            </div>
        )
    }
}




export default SearchPage;