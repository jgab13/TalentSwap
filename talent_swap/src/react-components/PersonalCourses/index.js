import React from "react";
import "./styles.css";

import Header from "./../Header"
import CourseResults from "./../SearchCourseResults"

// prepare hardcoded user and course data to render on the search page
import {hardcodedCourses} from "./../../courses/testcourses.js"
import UserManager from "./../../users/user-manager.js"
import {hardCodedUsers} from "./../../users/user-manager.js"
import {getCourse, getPast, getUpcoming} from "./../../courses/courseManager.js";

//should be fetched from database
const currUser = hardCodedUsers[0];
const upcomingCourses = getUpcoming();
const pastCourses = getPast();


class PersonalCourses extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courses: upcomingCourses,
            filter: ''
        }
        this.findCourse = this.findCourse.bind(this);
    }

    findCourse(filter) {
        let courseList = [];
        let courseId;
        let addcourse;
        switch(filter) {
          case "tp":
            courseId = currUser.coursesTeaching;
            courseId.forEach(id => {
                addcourse = pastCourses.find(course => course.id === id);
                if (addcourse != undefined) {
                    courseList.push(addcourse);
                }
            })
            return courseList;
          case "tf":
            courseId = currUser.coursesTeaching;
            courseId.forEach(id => {
                addcourse = upcomingCourses.find(course => course.id === id)
                if (addcourse != undefined) {
                    courseList.push(addcourse);
                }
            });
            return courseList;
          case "sp":
            courseId = currUser.coursesLearning;
            courseId.forEach(id => {
                addcourse = pastCourses.find(course => course.id === id)
                if (addcourse != undefined) {
                    courseList.push(addcourse);
                }
            });
            return courseList;
          case "sf":
            courseId = currUser.coursesLearning;
            courseId.forEach(id => {
                addcourse = upcomingCourses.find(course => course.id === id)
                if (addcourse != undefined) {
                    courseList.push(addcourse);
                }
            });
            return courseList;
        }
    }

    render(){
        const filter = this.props.match.params.filter;
        return(
            <div className="SearchPage">
                <Header />
                {this.findCourse(filter).length === 0 ? 
                    <h4 id='alert'> There are no courses for you! </h4>
                    :
                <CourseResults courses = {this.findCourse(filter)}/>}
            </div>
        )
    }
}




export default PersonalCourses;