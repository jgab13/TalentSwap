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
import {hardcodedCourses} from "./../../courses/testcourses.js"
import {UserContext} from "./../../react-contexts/user-context";

  const reviewDesc = "This was the greatest course I have ever taken. My guy Jonathan Gabe did a great job teaching this course. This was my favourite of all time. I'm into it. Let's do it again!!!!";
  const reviewDesc1 = "Test review";
  const reviewDesc2 = "Test review2";  

  const review1 = {
      user: "user1",
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
  const currCourse = hardcodedCourses[2];
  const enrollment = ["user1", "user2", "user3", "user4"];
  

class DetailedCoursePage extends React.Component {
  //static contextType = UserContext;

  state = {
      currUser: "user1",
      course: currCourse,
      review: [review1, review2, review3],
      enrolled: false,
      compl: false,
      edit: false,
      reviewed: false,
      currReview: null
  }

  //On Mount component functions

  //Set the current user
  // setCurrentUser = () => {
   // console.log(this.context);
   // const user = this.context;
    // this.setState({
      // currUser: this.context,
    // })
   //  console.log(this.state.currUser);
   // console.log(this.state.enrolled);
  // }

  //check if the current user is enrolled in the course.
  checkEnrollment = () => {
    const enrollUser = enrollment.filter(user => {
      return user === this.state.currUser;
    });
    const enrolled = enrollUser.length === 0 ? false: true;
    this.setState({
      enrolled: enrolled
    })
  }

  //Check the current date to determine if the course has been completed.
  checkCourseCompl = (date) => {
  	const cur = new Date(Date.now());
  	const courseDate = new Date(this.state.course.date);
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
      compl: compl
    })
  }

  //check if the current user has reviewed the current course.
  checkIfReviewed = () => {
    const checkReview = this.state.review.filter(rev => {
      return rev.user === this.state.currUser;
    });
    const check = checkReview.length !== 0 ? true : false
    console.log(check)
    this.setState({
      reviewed: check,
      edit: check
    })
  }


  //On click or on change functions
  enrollCourse = () => {
   if (this.state.currUser === null){
    this.setState({
      enrolled: !this.state.enrolled,
    })
   } else {
    let currentEnrolled = this.state.course.enrollment + 1;
    let course = this.state.course;
    course.enrollment = currentEnrolled;
    this.setState({
      enrolled: !this.state.enrolled,
      course: course
    })
   }
  }

  //Changes the state of reviewed to pop up review entry form.
  addReviewFunc = () => {
  	this.setState({
  		reviewed : !this.state.reviewed,
  	})
  }


  //Sets currReview to not null to trigger edit pop up
  editReview = event => {
    console.log(event.target.name);
    const getReview = this.state.review.filter(rev => {
      return rev.description === event.target.name;
    });
    this.setState({
      currReview: getReview[0]
    })
  }

  //Removes review from current reviews
  deleteReview = event => {
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

  //Exits addReview entry form.
  cancelForm = event =>{
    this.setState({
      reviewed: !this.state.reviewed,
      currReview: null
    })
  }

  //This function is not helpful for phase 1 - will use it for phase2
  addReviewForm = (event, date, rating, desc)  => {
    const newReview = {
      user: this.state.currUser,
      date: date,
      img: instImg,
      description: desc,
      rating: rating
    };
    const existingReviews = this.state.review
    const getReview = existingReviews.filter(rev => {
      return rev.user !== newReview.user;
    });
    getReview.push(newReview);
    this.setState({
      review: getReview
    })
  }

  componentDidMount() {
    //Check for class fullness occurs automatically.
    //sets current user of the web app from UserContext and check if signed in.
    //this.setCurrentUser(); 
    //Check if course completed
    this.checkCourseCompl(this.state.course.date);
    //Check if enrolled in course.
    this.checkEnrollment();
    //check if already reviewed the course.
    this.checkIfReviewed();
    }

  render() {
  	const completedCourse = this.state.compl? <span id="completed">Course completed!</span> : null;
  	const addReview = (this.state.compl && this.state.enrolled && !this.state.reviewed && !this.state.edit ?
  					   <Button className="review" onClick={this.addReviewFunc} variant="outline-success"> Add review</Button> : null);


    return (
    
    <div>
      <Header/>
      {this.state.enrolled && this.state.currUser === null ? <AuthSystem/> : null}
      {this.state.reviewed && !this.state.edit ? <AddCourseReview curDate={""} stars={""} cancelForm={this.cancelForm} addReview={this.addReviewForm} description={""}/> : null}
      {this.state.currReview === null ? null : <AddCourseReview curDate={this.state.currReview.date} cancelForm={this.cancelForm} addReview={this.addReviewForm} stars={this.state.currReview.rating} description={this.state.currReview.description}/>}
      <CourseList title={this.state.course.topic} 
        description={this.state.course.description}
        enrolled={this.state.course.enrollment} 
        capacity={this.state.course.capacity}
        rate={this.state.course.rate}
        instruct={this.state.course.teacher}
        instImg = {this.state.course.img}
        alreadyEnrolled={this.state.enrolled}
        link={this.enrollCourse}
        credit = {this.state.course.credit}
        start={this.state.course.date}
        completed={this.state.compl}
        user={this.state.currUser}
        />
        {completedCourse}


      <h3>Reviews for this course: </h3>
  	  {addReview}
      {this.state.review.map(rev => (<CourseReview review={rev} edit={this.state.edit} compl={this.state.compl} sign={this.state.enrolled} user={this.state.currUser} editLink={this.editReview} deleteLink={this.deleteReview}/>) 

      								)}
    </div>

    );
  }
}

export default DetailedCoursePage;
