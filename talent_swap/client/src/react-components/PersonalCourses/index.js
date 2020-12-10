import React from "react";
import "./styles.css";

import Header from "./../Header"
import CourseResults from "./../SearchCourseResults"

import { getCourses } from "../../actions/course.js"
import { checkSession } from "../../actions/user.js";
import AuthSystem from "./../AuthSystem";


class PersonalCourses extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courses: null,
            filter: '',
            currentUser: ""
        }
        this.findCourse = this.findCourse.bind(this);
    }

    async componentDidMount(){
        await getCourses(this);
        await checkSession(this)
    }

    findCourse(filter) {
        const courses = this.state.courses;
        let courseList = [];
        switch(filter) {
          case "tp":
            for (let i in courses) {
                if (courses[i].teacher == this.state.currentUser && new Date(courses[i].endtime).getTime() < Date.now()) {
                    courseList.push(courses[i]);
                }
            }
            return courseList;
          case "tf":
           for (let i in courses) {
                if (courses[i].teacher == this.state.currentUser && new Date(courses[i].endtime).getTime() > Date.now()) {
                    courseList.push(courses[i]);
                }
            }
            return courseList;
          case "sp":
            for (let i in courses) {
                if (courses[i].enrolledUsers.includes(this.state.currentUser) && new Date(courses[i].endtime).getTime() < Date.now()) {
                    courseList.push(courses[i]);
                }
            }
            return courseList;
          case "sf":
            for (let i in courses) {
                if (courses[i].enrolledUsers.includes(this.state.currentUser) && new Date(courses[i].endtime).getTime() > Date.now()) {
                    courseList.push(courses[i]);
                }
            }
            return courseList;
        }
    }

    render(){
        const filter = this.props.match.params.filter;
        return(
            <div className="SearchPage">
                <Header />
                {/*this.state.currentUser == "" ? <AuthSystem/> : null*/}
                {this.findCourse(filter).length === 0 ? 
                    <h4 id='alert'> There are no courses for you! </h4>
                    :
                <CourseResults courses = {this.findCourse(filter)}/>}
            </div>
        )
    }
}




export default PersonalCourses;