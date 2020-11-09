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
                    return 1 < course.capacity < 9
                case 'medium':
                    return 8 < course.capacity < 21
                case 'large':
                    return course.capacity > 20
            }}))
    }
    return r_courses;
}

// function FilterCourses(curr_courses, cfilters){
//     let r_courses = [];
//     for (let f of cfilters){
//         const filter = f.substring(0, f.indexOf(":"))
//         const key = f.substring(f.indexOf(":") + 1);
//         console.log(filter, key);
//         console.log(curr_courses);
//         switch (filter) {
//             case 'level':
//                 r_courses = r_courses.concat(curr_courses.filter(course =>
//                     course.level === key))
//                 break;
//             case 'date':
//                 r_courses = r_courses.concat(curr_courses.filter(course =>
//                     key === "upcoming"
//                     ? course.starttime > Date.now()
//                     : course.starttime < Date.now()))
//                 break;
//             case 'size':
//                 r_courses = r_courses.concat(curr_courses.filter(course =>
//                     {switch(key){
//                         case 'one': 
//                             return course.capacity === 1
//                             break
//                         case 'small':
//                             return 1 < course.capacity < 9
//                             break
//                         case 'medium':
//                             return 8 < course.capacity < 21
//                             break
//                         case 'large':
//                             return course.capacity > 20
//                             break
//                     }}))
//                 break;
//             default:
//                 break;
//           }
//     }
//     console.log("done filtering, return courses ", r_courses)
//     return r_courses;
// }


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
        // apply course level filters, if any
        const clfilters = this.props.location.state 
            ? this.props.location.state.levelFilters
            : undefined;
        console.log(clfilters);
        courses = clfilters
            ? FilterCourseLevels(courses, clfilters)
            : courses;
        console.log(courses);
        // apply course date filters, if any
        const cdfilters = this.props.location.state
            ? this.props.location.state.dateFilters
            : undefined;
        courses = cdfilters
            ? FilterCourseDates(courses, cdfilters)
            : courses;
        // apply course size filters, if any
        const csfilters = this.props.location.state
            ? this.props.location.state.sizeFilters
            : undefined;
        courses = csfilters 
            ? FiltersCourseSizes(courses, csfilters)
            : courses
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