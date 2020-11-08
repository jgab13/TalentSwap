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


class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tab : "courses", 
            // keyword: "",
            keyword: this.props.location.state.searchInput,
            users: hardcodedUsers,      // Hardcoded users
            courses: hardcodedCourses,   // Hardcoded courses
            // course_results: [], 
            // user_results: []
        };
        this.handleTabSelect = this.handleTabSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        // this.handleLevelFilter = this.handleLevelFilter.bind(this);
        // this.handleDateFilter = this.handleDateFilter.bind(this);
        // this.handleSizeFilter = this.handleSizeFilter.bind(this);
    }

    handleTabSelect = (eventKey) => {
        this.setState({tab: eventKey});
    }
    handleSearch = () => {
        const keyword = this.state.keyword;
        if (!keyword) return;
        this.setState({
            // keyword: input,
            courses: this.state.courses.filter((course) => 
               course.topic.toLowerCase() === keyword.toLowerCase()
            ),
            users: this.state.users.filter((user) => 
                user.name.toLowerCase() === keyword.toLowerCase()
            )
        });
    } 
    // handleLevelFilter(eventKey){
    //     this.setState({
    //         courses: this.state.courses.filter( (course) =>
    //             course.level === eventKey
    //         )
    //     })
    // }
    // handleDateFilter(eventKey){
  	//     const cur = new Date(Date.now());
    //     this.setState({
    //         courses: this.state.courses.filter( (course) =>
    //             (eventKey === "upcoming") ? course.date >= 
    //         )
    //     })
    // }

    render(){
        console.log(this.props.location.state.stateInput);
        // {this.handleSearch}


        const users = this.state.users;
        const courses = this.state.courses;
        const tab = this.state.tab;
        let filter, results;
        filter = (tab === "courses") ? <CourseFilter /> : <UserFilter />;
        results = (tab === "courses") ? <CourseResults courses = {courses}/> : <UserResults users = {users}/>;
        return(
            <div className="SearchPage">
                <Header />
                <SearchTabs handleTabSelect = {this.handleTabSelect} />
                <p id="filterHeader">Filter by</p>
                {filter}
                {results}
            </div>
        )
    }
}




export default SearchPage;