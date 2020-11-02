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
import AddCourseReview from "./../AddCourseReview"
import Button from "react-bootstrap/Button";

// Case 1: Not signed in
// currUser == null
// if course is full or complete - grey out button - DONE
// if course is complete - grey out button - DONE
// if not full & not complete - then show button and sign up - which should pop up the auth system - partial done - need to fix logic

// Case 2: Signed in
// subcase 1 - not enrolled && not completed
// 		enrolled - modify course object and use
// subcase 2 - enrolled && not completed
//		nothing to do - can't click the button
// subcase 3 - enrolled && completed
//		check if course reviwed or not
//		if not reviewed - add button for review
//		if reviwed - edit/delete button for review that user gave
//		edit - change review
//		delete - remove review


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
    img: instImg,
    credit: 10,
    startDate: "2020-10-27"
  }

  const reviewDesc = "This was the greatest course I have ever taken. My guy Jonathan Gabe did a great job teaching this course. This was my favourite of all time. I'm into it. Let's do it again!!!!";
  const reviewDesc1 = "Test review";
  const reviewDesc2 = "Test review2";  

  const review1 = {
      user: "user1",
      date: "10-12-2019",
      img: instImg,
      description: reviewDesc,
      rating: 5
  }

  const review2 = {
      user: "user2",
      date: "10-12-2020",
      img: instImg,
      description: reviewDesc1,
      rating: 3
  }

  const review3 = {
      user: "user3",
      date: "10-13-2020",
      img: instImg,
      description: reviewDesc2,
      rating: 4
  }

  console.log(course1.title)

  

class DetailedCoursePage extends React.Component {

  state = {
      currUser: "user1",
      course: course1,
      review: [review1, review2, review3],
      sign: true,
      compl: false,
      edit: true,
      reviewed: true,
      currReview: null
  }

  checkCourseCompl = (date) => {
  	const cur = new Date(Date.now());
  	const courseDate = new Date(this.state.course.startDate);
  	let compl = false;
  	if (cur.getFullYear() > courseDate.getFullYear()){
  		compl = true;

  	} else if (cur.getFullYear() === courseDate.getFullYear() && cur.getMonth() > courseDate.getMonth()){
  		compl = true;
  	} else if (cur.getFullYear() === courseDate.getFullYear() && cur.getMonth() === courseDate.getMonth() 
  				&& cur.getDate() > courseDate.getDate()){
  		compl = true;
  	}



  	this.setState({
      compl: compl,
    })
    console.log(this.state.compl);
  }

  signup = () => {
	 this.checkCourseCompl(this.state.course.startDate);
	 this.setState({
	   	sign: !this.state.sign,
	 })
	// Need functionality if user is logged in or not
	// if logged in = then add user into course object
	// if not logged in = then on click - auth system
	
  }

  addReviewFunc = () => {
  	this.setState({
  		reviewed : !this.state.reviewed,
  	})
  }



  editReview = event => {
    console.log(event.target.name);
    const getReview = this.state.review.filter(rev => {
      return rev.description === event.target.name;
    });
    this.setState({
      currReview: getReview[0]
    })
  }

  deleteReview = event => {
    // console.log(event.target.name);
    const reviewName = event.target.name;
    const deletedReviews = this.state.review.filter(rev => {
      return rev.description !== reviewName;
    });
    this.setState({
      review: deletedReviews,
      reviewed: false,
      edit: false
    })
  }

  componentDidMount() {
  		//check if enrollement exceeded or
  		//check if enrolled initially
  		//check if reviewed initially
  		//check if course completed initially;
    this.checkCourseCompl(this.state.course.startDate);
    	
    	
    }

  render() {
  	const completedCourse = this.state.compl? <span id="completed">Course completed!</span> : null;
  	const addReview = (this.state.compl && this.state.sign && !this.state.reviewed && !this.state.edit ?
  					   <Button className="review" onClick={this.addReviewFunc} variant="outline-success"> Add review</Button> : null);


    return (
    
    <div>
      <Header/>
      {this.state.sign && this.state.currUser === null ? <AuthSystem/> : null}
      {this.state.reviewed && !this.state.edit ? <AddCourseReview curDate={""} stars={""} description={""}/> : null}
      {this.state.currReview !== null? <AddCourseReview curDate={this.state.currReview.date} stars={this.state.currReview.rating} description={this.state.currReview.description}/> : null}
      <CourseList title={this.state.course.title} 
        description={this.state.course.description}
        enrolled={this.state.course.enroll} 
        capacity={this.state.course.capacity}
        rate={this.state.course.rating}
        instruct={this.state.course.instructor}
        instImg = {this.state.course.img}
        alreadyEnrolled={this.state.sign}
        link={this.signup}
        credit = {this.state.course.credit}
        start={this.state.course.startDate}
        completed={this.state.compl}
        user={this.state.currUser}
        />
        {completedCourse}


      <h3>Reviews for this course: </h3>
  	  {addReview}
      {this.state.review.map(rev => (<CourseReview review={rev} edit={this.state.edit} compl={this.state.compl} sign={this.state.sign} user={this.state.currUser} editLink={this.editReview} deleteLink={this.deleteReview}/>) 

      								)}
    </div>

    );
  }
}

export default DetailedCoursePage;
