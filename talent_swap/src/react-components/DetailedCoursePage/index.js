import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// import { uid } from "react-uid";
import CourseList from "./../CourseList";
import CourseReview from "./../CourseReview"
// import img from ....;
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import instImg from "./logo192.png";

//Missing information about credits for the course! Need to add!

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
      description: reviewDesc
  }

  const review2 = {
      user: "user2",
      img: instImg,
      description: reviewDesc1
  }

  const review3 = {
      user: "user3",
      img: instImg,
      description: reviewDesc2
  }

  console.log(course1.title)

class DetailedCoursePage extends React.Component {

  state = {
      currUser: null,
      course: course1,
      review: [review1, review2, review3]
    }

  render() {

    return (
    <div>
      <CourseList title={this.state.course.title} 
        description={this.state.course.description}
        enrolled={this.state.course.enroll} 
        capacity={this.state.course.capacity}
        rate={this.state.course.rating}
        instruct={this.state.course.instructor}
        instImg = {this.state.course.img} />
      <Button className="button" variant="primary" size="lg">
        Enroll now!
      </Button>

      <h3>Reviews for this course: </h3>
      {this.state.review.map(rev => (<CourseReview review={rev} />) )}
      

      


    

    </div>

    );
  }
}

export default DetailedCoursePage;
