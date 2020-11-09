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
        this.state = Object.assign({
            tab : "courses", 
        }, this.updateState());
        this.handleTabSelect = this.handleTabSelect.bind(this);
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
        const users = keyword
            ? hardcodedUsers.filter((user) => 
                 (user.name.toLowerCase().match(keyword.toLowerCase())) 
                 || (user.development.toLowerCase().match(keyword.toLowerCase())) 
                 || (user.expertise.toLowerCase().match(keyword.toLowerCase())) 
            )
            : hardcodedUsers;
        const courses = keyword
            ? hardcodedCourses.filter((course) => 
                course.topic.toLowerCase().match(keyword.toLowerCase()) !== null
            )
            : hardcodedCourses;
        return {
            keyword: keyword,
            users: users,
            courses: courses
        };
    }

    handleTabSelect = (eventKey) => {
        this.setState({tab: eventKey});
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