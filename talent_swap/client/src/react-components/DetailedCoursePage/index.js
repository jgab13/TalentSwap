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
      getCourse(this, "5fcc29eaa5576015bc327d3b")
      checkSession(this) //sets the currentUser which passes to CourseContainer to set current user        
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
         
        return (
          <div>
            <CourseContainer course={this.state.course} user={this.state.currentUser}/>

          </div>
          );
    }

	}

}

export default DetailedCoursePage;
