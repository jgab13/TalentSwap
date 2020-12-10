import React from "react";
import CourseContainer from "./../CourseContainer";
import { checkSession } from "../../actions/user.js";
import { getCourse } from "../../actions/course.js";
import { Redirect } from 'react-router-dom';

class DetailedCoursePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.location.state !== undefined ? this.props.location.state.course._id : null,
      course: null,
      currentUser: null
    }
  }

    async componentDidMount() {
      await checkSession(this)
      await getCourse(this, this.state.id)
    }

  	render() {
    
      if (this.state.course !== null){
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
        
    } else if (this.state.id === null){
      return (<div><Redirect to={"/"} /></div>);
    }
    else {
      return (<div></div>);  

    } 


	}

}

export default DetailedCoursePage;
