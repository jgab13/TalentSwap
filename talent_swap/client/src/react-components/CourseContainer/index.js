import React from "react";
import { Link } from 'react-router-dom';
import "./../DetailedCoursePageTeacher/styles.css";
import CourseList from "./../CourseList";
import CourseReview from "./../CourseReview"
import Container from "react-bootstrap/Container";
import Header from "./../Header";
import instImg from "./../DetailedCoursePage/logo192.png";
import AuthSystem from "./../AuthSystem";
import AddCourseReview from "./../AddCourseReview";
import Button from "react-bootstrap/Button";
import {hardcodedCourses} from "./../../courses/testcourses.js";
import {hardCodedUsers} from "./../../users/user-manager.js";
import UserManager from "./../../users/user-manager.js";
import {getCourse} from "./../../courses/courseManager.js";

  const enrollment = [hardCodedUsers[0].name, "user2", "user3", "user4"];

class CourseContainer extends React.Component {

  state = {
      //Server call needed to retrieve current user and course information from database.
      currUser: hardCodedUsers[this.props.userID],
      course: getCourse(this.props.courseID),
      review: this.props.reviews,
      enrolled: false,
      compl: false,
      edit: false,
      reviewed: false,
      currReview: null,
      adminUser: this.props.admin
  }

  /////On Mount component functions

  //check if the current user is enrolled in the course.
  checkEnrollment = () => {
    if (this.state.course !== null && this.state.currUser !== undefined){
      console.log(this.state.currUser)
      const enrollUser = enrollment.filter(user => {
        return user === this.state.currUser.name;
      });
      const enrolled = enrollUser.length === 0 ? false: true;
      this.setState({
        enrolled: enrolled
      })  
    }
  }

  //Check the current date to determine if the course has been completed.
  checkCourseCompl = () => {
    if (this.state.course !== null){
      const cur = new Date(Date.now());
      const courseDate = this.state.course.endtime;
      let compl = false;
      if (courseDate < cur){
        compl = true;
      }
      this.setState({
        compl: compl
      })
      console.log("This course is not yet completed " + this.state.compl);
    }
  }

  //check if the current user has reviewed the current course.
  checkIfReviewed = () => {
    if (this.state.course !== null){
      const checkReview = this.state.review.filter(rev => {
        console.log(this.state.currUser.name);
        console.log(rev.user);
        return rev.user === this.state.currUser.name;
      });
      const check = checkReview.length !== 0 ? true : false
      console.log(check)
      this.setState({
        reviewed: check,
        edit: check
      })  
    }
  }

  /////On change and other functions

  //Calculate rating for course - call this any time a review is modified, added or deleted.
  calcReviewRating = (Review) => {
    const count = Review.length;
    const totalRate = Review.reduce(function(total, rev)  {
      return total + rev.rating 
    }, 0);
    return parseInt(totalRate / count);
  }

  //Enroll current user in course.
  enrollCourse = () => {
   if (this.state.currUser === undefined){
    this.setState({
      enrolled: !this.state.enrolled,
    })
   } else if (this.state.currUser.credits < this.state.course.credit){
      alert('Insufficient credits to enroll!')
   }
   else {
    let credits = this.state.currUser.credits
    let currUser = this.state.currUser
    let currentEnrolled = this.state.course.enrollment + 1;
    let course = this.state.course;
    let newCredits = credits - course.credit
    currUser.credits = newCredits
    course.enrollment = currentEnrolled;

    //Server call needed to increase enrollment in course in database.
    this.setState({
      enrolled: !this.state.enrolled,
      course: course,
      currUser: currUser
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
    const newRating = this.calcReviewRating(deletedReviews);
    // const newRating = calcReviewRating(deletedReviews);
    const curCourse = this.state.course;
    curCourse.rate = newRating;
    console.log(curCourse);
    //Server call needed to delete review from course in database.
    this.setState({
      review: deletedReviews,
      reviewed: false,
      edit: false,
      course: curCourse 
    })
  }

  //Exits addReview entry form.
  cancelForm = event =>{
    this.setState({
      reviewed: !this.state.reviewed,
      currReview: null
    })
  }

  //Add or edit review from current user using details for addReview entry form.
  addReviewForm = (date, rating, desc)  => {

    if (date === ""){
      alert('Date cannot be blank. Enter a valid date.');
      return;
    } else if (desc === ""){
      alert('Description cannot be blank. Enter a valid date.');
      return;
    } else if (rating > 5 || rating < 0){
      alert('Rating must be a number between 0 and 5. Enter a valid rating.');
      return;
    }

    const newReview = {
      user: this.state.currUser.name,
      date: date,
      img: instImg,
      description: desc,
      rating: parseInt(rating)
    };
    const existingReviews = this.state.review
    const getReview = existingReviews.filter(rev => {
      return rev.user !== newReview.user;
    });
    getReview.push(newReview);
    //Server call needed to add review to the course in the database.
    const newRating = this.calcReviewRating(getReview);
    // const newRating = calcReviewRating(getReview);
    const curCourse = this.state.course;
    curCourse.rate = newRating;
    this.setState({
      review: getReview,
      edit: true,
      currReview: null,
      course: curCourse 
    })
  }

  deleteCourse = event => {
    const deleteCourse = hardcodedCourses.filter(course => {
      return course !== this.state.course;
    });
    //Server call needed to delte course from database.
    alert("Course successfully deleted");
  }


  componentDidMount() {
    //Check if course completed
    this.checkCourseCompl();
    //Check if enrolled in course.
    this.checkEnrollment();
    //check if already reviewed the course.
    this.checkIfReviewed();
    }

  render() {

    const {courseID, userID, reviews, admin} = this.props;
  	const completedCourse = this.state.compl? <span id="completed">Course completed!</span> : null;
  	const addReview = (this.state.compl && this.state.enrolled && !this.state.reviewed && !this.state.edit && this.state.currUser.name !== this.state.course.instruct ?
  					   <Button className="review" onClick={this.addReviewFunc} variant="outline-success"> Add review</Button> : null);
    const deleteCourse = this.state.adminUser === this.state.currUser ? (<Link to={"./../AdminDashboard"}>
      <Button className="delete" onClick={this.deleteCourse} variant="danger"> Delete Course</Button>
      </Link>) : null;

    return (
    
    <div>
      <Header/>
      {this.state.enrolled && this.state.currUser === undefined ? <AuthSystem/> : null}
      {this.state.reviewed && !this.state.edit ? <AddCourseReview curDate={""} stars={""} cancelForm={this.cancelForm} addReview={this.addReviewForm} description={""}/> : null}
      {this.state.currReview === null ? null : <AddCourseReview curDate={this.state.currReview.date} cancelForm={this.cancelForm} addReview={this.addReviewForm} stars={this.state.currReview.rating} description={this.state.currReview.description}/>}
      {deleteCourse}
      <CourseList  
        course= {this.state.course}
        alreadyEnrolled={this.state.enrolled}
        link={this.enrollCourse}
        completed={this.state.compl}
        user={this.state.currUser}
        admin={this.state.adminUser !== null}
        />
        {completedCourse}
        
      <h3>Reviews for this course: </h3>
  	  {addReview}
      {this.state.review.map(rev => (<CourseReview review={rev} edit={this.state.edit} compl={this.state.compl} sign={this.state.enrolled} user={this.state.currUser.name} editLink={this.editReview} deleteLink={this.deleteReview}/>) 
      )}
    </div>

    );
  }
}

export default CourseContainer;
