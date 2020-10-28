import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// import { uid } from "react-uid";
import CourseList from "./../CourseList";
import CourseReview from "./../CourseReview"
// import img from ....;

import Container from "react-bootstrap/Container";
import Header from "./../Header"

import instImg from "./logo192.png";
import AuthSystem from "./../AuthSystem"

//Missing information about credits for the course! Need to add!
//Case 1 --> visitor i.e. current user = null --> enrolled should pop up sign in - cannot add review
//Case 2 --> Already enrolled or max enrollment -- instead of button, greyed out or disabled
//  a) if already reviewed --> cannot review/can edit - need edit input
//  b) if not already reviwed --> can review - add review button
//Case 3 --> Not enrolled - can enroll and click on the button
//Case 4 --> if admin user, shouldn't be able to enroll - just remove/delete


const CourseDesc = "Welcome to introduction to cognitive science. This class explores the history and philosophy of the mind, important concepts in cognitive psychology such as intelligence, attention, memory and categorization, and important developments in the burgeoning field of artificial intelligence.";

  const course1 = {
    title: "Introduction to Cognitive Science",
    description: CourseDesc,
    enroll: 10,
    capacity: 11,
    rating: 4,
    instructor: "JG",
    img: instImg
  }

  const reviewDesc = "This was the greatest course I have ever taken. My guy Jonathan Gabe did a great job teaching this course. This was my favourite of all time. I'm into it. Let's do it again!!!!";
  const reviewDesc1 = "Test review";
  const reviewDesc2 = "Test review2";  

  const review1 = {
      user: "user1",
      img: instImg,
      description: reviewDesc,
      rating: 5
  }

  const review2 = {
      user: "user2",
      img: instImg,
      description: reviewDesc1,
      rating: 3
  }

  const review3 = {
      user: "user3",
      img: instImg,
      description: reviewDesc2,
      rating: 4
  }

  console.log(course1.title)

  

class DetailedCoursePage extends React.Component {

  state = {
      currUser: "1",
      course: course1,
      review: [review1, review2, review3],
      sign: false
  }

  signup = () => {
    this.setState({
      sign: !this.state.sign
    })
  }

  render() {

    return (
    <div>
      <Header/>
      {this.state.sign && this.state.currUser === null ? <AuthSystem/> : null}
      <CourseList title={this.state.course.title} 
        description={this.state.course.description}
        enrolled={this.state.course.enroll} 
        capacity={this.state.course.capacity}
        rate={this.state.course.rating}
        instruct={this.state.course.instructor}
        instImg = {this.state.course.img}
        alreadyEnrolled={true}
        link={this.signup} />


      <h3>Reviews for this course: </h3>
      {this.state.review.map(rev => (<CourseReview review={rev} />) )}
    </div>

    );
  }
}

export default DetailedCoursePage;
