import React from "react";
import "./styles.css";


import Header from "./../Header"
import SearchTabs from "./../SearchTabs"
import CourseFilter from "./../SearchCourseFilter"
import UserFilter from "./../SearchUserFilter"
// import UserThumbnail from "./../UserThumbnail";
// import CourseResults from "./../SearchCourseResults"
import UserResults from "./../SearchUserResults"

// prepare hardcoded user and course data to render on the search page
import {hardcodedCourses} from "./../../courses/testcourses.js"
import UserManager from "./../../users/user-manager.js"
const hardcodedUsers = [UserManager.getUserFromId(1), UserManager.getUserFromId(2)]


class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tab : "courses"
        };
        this.handleTabClick = this.handleTabClick.bind(this);
        
    }

    handleTabClick(e){
        e.preventDefault();
        const curr = (e.target.eventKey === "courses") ? "courses" : "users";
        this.setState({tab: curr});
    }

    render(){
        // Hardcoded users
        const users = hardcodedUsers;
        // Hardcoded courses
        const courses = hardcodedCourses;

        const tab = this.state.tab;
        let filter, results;
        filter = (tab === "courses") ? <CourseFilter /> : <UserFilter />;
        results = (tab === "courses") ? <UserResults users = {users}/> : <UserResults users = {users}/>;
        return(
            <div className="SearchPage">
                <Header />
                <SearchTabs onClick={this.handleTabClick} />
                <p id="filterHeader">Filter by</p>
                {filter}
                {results}
            </div>
        )
    }
}




export default SearchPage;