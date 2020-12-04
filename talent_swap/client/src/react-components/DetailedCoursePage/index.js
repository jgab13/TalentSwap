import React from "react";
import CourseContainer from "./../CourseContainer";
import instImg from "./logo192.png";
import {hardcodedCourses} from "./../../courses/testcourses.js";
import {hardCodedUsers} from "./../../users/user-manager.js";
import UserManager from "./../../users/user-manager.js";
import { checkSession } from "../../actions/user.js";
import { getCourse } from "../../actions/course.js";


  const reviewDesc = "This was the greatest course I have ever taken. My guy did a great job teaching this course. This was my favourite of all time. I'm into it. Let's do it again!!!!";
  const reviewDesc1 = "Really enjoyed the course. Lots of fun. Big fan!";
  const reviewDesc2 = "Test review2";  

  const review1 = {
      user: hardCodedUsers[0].name,
      date: "11-02-2020",
      img: instImg,
      description: reviewDesc,
      rating: 5
  }

  const review2 = {
      user: "user2",
      date: "11-03-2020",
      img: instImg,
      description: reviewDesc1,
      rating: 3
  }

  const review3 = {
      user: "user3",
      date: "11-04-2020",
      img: instImg,
      description: reviewDesc2,
      rating: 4
  }

  const reviews = [review1, review2, review3];

class DetailedCoursePage extends React.Component {
    state = {
      courseID: this.props.location.state.course.id,
      course: null,
      currentUser: null
    }



    componentDidMount() {
      getCourse(this, '5fc7c1ffcf3dce1e70de4364')
      checkSession(this)        
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
        const course0 = this.state.courseID === 0 ? <CourseContainer courseID={this.state.courseID} userID={1} reviews={reviews} admin={null}/> : null ;
        const course1 = this.state.courseID === 1 ? <CourseContainer courseID={this.state.courseID} userID={1} reviews={[]} admin={null}/> : null ;
        const course2 = this.state.courseID === 2 ? <CourseContainer courseID={this.state.courseID} userID={0} reviews={reviews} admin={null}/> : null ;
        const course3 = this.state.courseID === 3 ? <CourseContainer courseID={this.state.courseID} userID={-1} reviews={[]} admin={null}/> : null ;
        const course4 = this.state.courseID === 4 ? <CourseContainer courseID={this.state.courseID} userID={0} reviews={[]} admin={UserManager.getUserFromUsername("user")}/> : null ;
        
        return (
          <div>
           {course0} 
           {course1}
           {course2}
           {course3}
           {course4}

          </div>
          );
    }

	}

}

export default DetailedCoursePage;
