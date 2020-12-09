import React from "react";
import { Link } from 'react-router-dom';
import "./../DetailedCoursePageTeacher/styles.css";
import CourseList from "./../CourseList";
import CourseReview from "./../CourseReview"
import Container from "react-bootstrap/Container";
import Header from "./../Header";
import AuthSystem from "./../AuthSystem";
import AddCourseReview from "./../AddCourseReview";
import Button from "react-bootstrap/Button";
// import {hardcodedCourses} from "./../../courses/testcourses.js";
// import {hardCodedUsers} from "./../../users/user-manager.js";
import UserManager from "./../../users/user-manager.js";
// import {getCourse} from "./../../courses/courseManager.js";
import { deleteCourse, editReview, addReview, deleteReview, enroll, getCourse, updateCourse, unenroll } from "../../actions/course.js";

class CourseContainer extends React.Component {

  state = {
      currUser: this.props.user,
      course: this.props.course,
      review: this.props.course.ratings,
      enrolled: false,
      compl: false,
      edit: false,
      reviewed: false,
      currReview: null,
      adminUser: null, 
      enrollment: this.props.course.enrolledUsers
  }

  /////On Mount component functions

  //check if the current user is enrolled in the course.
  checkEnrollment = () => {
    if (this.state.course !== null && this.state.currUser !== null){
      // console.log(this.state.currUser)
      const enrollUser = this.state.enrollment.filter(user => {
        return user === this.state.currUser; // Need to change review users
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
      // console.log(cur)
      const courseDate = new Date(this.state.course.endtime)
      // console.log(courseDate)
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
    if (this.state.course !== null && this.state.currUser !== null){
      const checkReview = this.state.review.filter(rev => {
        // console.log(this.state.currUser);
        // console.log(rev.user);
        return rev.user === this.state.currUser; //need to change user to username - change the api route
      });
      const check = checkReview.length !== 0 ? true : false
      // console.log(check)
      this.setState({
        reviewed: check,
        edit: check
      })  
    }
  }

  setAdminFlag = () => {
    const user = this.state.currUser
    // console.log("This is the user " + user)
    if (user !== null && user.includes("admin")){
      // console.log("userType is " + user.userType)
      this.setState({
        adminUser: user
      })   
      console.log(user.includes("admin"))
    }
      console.log("The admin user is now " + this.state.adminUser)
      console.log("This current user is now " + this.state.currUser)
      console.log("Are they equal?")
      console.log(this.state.adminUser === this.state.currUser)

      
  }

  /////On change and other functions

  //Calculate rating for course - call this any time a review is modified, added or deleted.
  calcReviewRating = (Review) => {
    const count = Review.length;
    if (count === 0){
      return 0;
    }
    const totalRate = Review.reduce(function(total, rev)  {
      return total + rev.rating 
    }, 0);
    return parseInt(totalRate / count);
  }

  //Enroll current user in course.
  enrollCourse = async () => {
   if (this.state.currUser === null || this.state.currUser.userType === 'admin'){
    this.setState({
      enrolled: !this.state.enrolled,
    })
   } else {
      if (!this.state.enrolled){
        await enroll(this, this.state.currUser, this.state.course._id)  
      } else {
        await unenroll(this, this.state.currUser, this.state.course._id)  
      }
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
    event.preventDefault()
    console.log(event.target.name);
    const getReview = this.state.review.filter(rev => {
      return rev.description === event.target.name;
    });
    this.setState({
      currReview: getReview[0]
    })
  }

  //Removes review from current reviews
  deleteReview = async (event) => {
    event.preventDefault()
    const reviewName = event.target.name;
    
    const reviewToDelete = this.state.review.filter(rev => {
      return rev.description === reviewName
    })
    console.log("this is the review to delete ")
    console.log(reviewToDelete[0])
    //server call to delete review
    await deleteReview(this.state.course._id, this.state.currUser)
    
    const remainingReview = this.state.review.filter(rev => {
      return rev.description !== reviewName
    })
    //calculation of new rating using only the remaining reviews
    const newRating = this.calcReviewRating(remainingReview);
    console.log(newRating)
    //update course rating in db
    await updateCourse(["rate"], [newRating], this.state.course._id)

    //updates front end
    const curCourse = this.state.course;
    curCourse.rate = newRating;

    this.setState({
      course: curCourse,
      review: remainingReview,
      reviewed: false,
      edit: false 
    })
  }

  //Exits addReview entry form.
  cancelForm = event =>{
    event.preventDefault()
    this.setState({
      reviewed: !this.state.reviewed,
      currReview: null
    })
  }

  //Add or edit review from current user using details for addReview entry form.
  addReviewForm = async (date, rating, desc)  => {

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
        user: this.state.currUser,
        date: date,
        description: desc,
        rating: parseInt(rating)
    };
    
    let getReview = this.state.review
    const checkReview = getReview.filter(rev => {
      return rev.user !== newReview.user;
    });
    //if the length of getReview and checkReview is the same, then the current user has
    //not reviewed the course and the course should be added to the db.
    if (getReview.length === checkReview.length){
      console.log(newReview)
      console.log(this.state.course._id)
      await addReview(this.state.course._id, newReview)
      
    }
    //Otherwise get the review that matches the current user and call the edit review route.
    else {
      const editThisReview = getReview.filter(rev => {
        return rev.user === newReview.user;
      });
      getReview = getReview.filter(rev => {
        return rev.user !== newReview.user
      })  
      console.log(editThisReview[0])
      await editReview(this.state.course._id, newReview)
      
    }
    getReview.push(newReview)
    console.log(getReview)
    //Calculate the new rating
    const newRating = this.calcReviewRating(getReview);
    console.log(newRating)
    //update the course rating in the db and update the front end
    await updateCourse(["rate"], [newRating], this.state.course._id)
    const curCourse = this.state.course
    curCourse.rate = newRating

    this.setState({
      course: curCourse,
      review: getReview,
      edit: true,
      currReview: null
    })

  }

  deleteCourseFunc = async (event) => {
    event.preventDefault()
    //Server call needed to delete course from database.
    alert("Course successfully deleted");
    await deleteCourse(this.state.course._id) // this works :)!
    window.location.href='/AdminDashboard'
  }


  componentDidMount() {
    //Check if course completed
    this.checkCourseCompl();
    //Check if enrolled in course.
    this.checkEnrollment();
    //check if already reviewed the course.
    this.checkIfReviewed();
    //set admin user flag
    this.setAdminFlag();
    }

  render() {
    const {courseID, userID, reviews, admin} = this.props;
    // console.log("the course is completed " + this.state.compl)
    // console.log("the user is enrolled " + this.state.enrolled)
    // console.log("the user has reveiwed " + this.state.reviewed)
    // console.log("this review should edittable " + this.state.edit)


  	const completedCourse = this.state.compl? <span id="completed">Course completed!</span> : null;
  	const addReview = (this.state.compl && this.state.enrolled && !this.state.reviewed && !this.state.edit && this.state.currUser !== this.state.course.teacher ?
  					   <Button className="review" onClick={this.addReviewFunc} variant="outline-success"> Add review</Button> : null);
    const deleteCourseButton = this.state.adminUser !== null ? <Button className="delete" onClick={this.deleteCourseFunc} variant="danger"> Delete Course</Button> : null;

    return (
    
    <div>
      <Header/>
      {this.state.enrolled && this.state.currUser === null ? <AuthSystem/> : null}
      {this.state.reviewed && !this.state.edit ? <AddCourseReview curDate={""} stars={""} cancelForm={this.cancelForm} addReview={this.addReviewForm} description={""}/> : null}
      {this.state.currReview === null ? null : <AddCourseReview curDate={this.state.currReview.date} cancelForm={this.cancelForm} addReview={this.addReviewForm} stars={this.state.currReview.rating} description={this.state.currReview.description}/>}
      {deleteCourseButton}
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
      {this.state.review.map(rev => (<CourseReview review={rev} edit={this.state.edit} compl={this.state.compl} sign={this.state.enrolled} user={this.state.currUser} editLink={this.editReview} deleteLink={this.deleteReview}/>) 
      )}
    </div>

    );
  }
}

export default CourseContainer;
