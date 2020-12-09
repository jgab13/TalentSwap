import React from "react";
import CourseContainer from "./../CourseContainer";
// import instImg from "./logo192.png";
// import {hardcodedCourses} from "./../../courses/testcourses.js";
// import {hardCodedUsers} from "./../../users/user-manager.js";
// import UserManager from "./../../users/user-manager.js";
import { checkSession } from "../../actions/user.js";
import { getCourse } from "../../actions/course.js";
import { Redirect } from 'react-router-dom';

//Jingwen - maybe you can redirect to the DetailedCoursePageTeacher if the course teacher === user?  <--Thanks:)
class DetailedCoursePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.location.state.course._id,
      course: null,
      currentUser: null
    }
  }

    async componentDidMount() {
      await checkSession(this)
      getCourse(this, this.state.id)
    }

  	render() {
    
    if (this.state.course === null){
      return (<div></div>)

    } else {
        console.log('This is the error')
        console.log(this.state.course)
        console.log('This is the error2')
        console.log(this.state.course.teacher)
        console.log(this.state.currentUser)
        if ((this.state.course.teacher !== this.state.currentUser) || (new Date(this.state.course.endtime).getTime() < Date.now())){
          return (
            <div>
              <CourseContainer course={this.state.course} user={this.state.currentUser}/>

            </div>
          );
          
        } 
        else {
          return (
          <div>
            <Redirect to={"/DetailedCoursePageTeacher/" + this.state.id /*this.state.id*/} />
            }
          </div>
          );  
        }
        
    }

	}

}

export default DetailedCoursePage;
