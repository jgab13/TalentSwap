import React from "react";
import { hardcodedCourses } from "./../../courses/testcourses.js"
import { hardCodedUsers } from "./../../users/user-manager.js"

import { Table, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCourses } from "../../actions/course.js";

const user = hardCodedUsers;
const course = hardcodedCourses;

export class UserTable extends React.Component {
  render() {
    return(
      <tbody>
      {user.map((user) => (
      <tr>
        <td>{user.username}</td>
        <td><Link to= {{pathname:`/UserProfile/${user.username}`}} >
                  {user.name}
            </Link></td>
        <td>{user.credits}</td>
        <td>{user.coursesTeaching}</td>
        <td>{user.coursesLearning}</td>
      </tr>   
      ))}
      </tbody>
    )
  }
}

export class CourseTable extends React.Component {
  state = {
    courses: null
  }

  async componentDidMount() {
    await getCourses(this)
  }

  render() {
    const cur = new Date(Date.now());
    if (this.state.courses === null) {
      return <div></div>
    }
    return(
      <tbody>
      {this.state.courses.map((course) => (
      <tr>
        <td>{course._id}</td>
        <td><Link to= {{
                        pathname: '/DetailedCoursePage',
                        state: {
                          course: course}
                      }} >
                  {course.topic}
            </Link></td>
        <td>{course.teacher}</td>
        <td>{course.credit}</td>
        <td>{new Date(course.endtime) < cur ? "Completed" : "Upcoming"}</td>
      </tr>      
      ))}
      </tbody>
    )
  }
}


class WebsiteStatus extends React.Component {

  render() {
    return (
      <div id="website-status">
          <h4>Website Status</h4>
          <Tabs>
            <Tab eventKey="user" title="User">
              <Table>
                    <thead className="thead-dark">
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Credits</th>
                            <th>Teaching</th>
                            <th>Learning</th>
                        </tr>
                    </thead>
                    <UserTable />
                </Table>
            </Tab>
            <Tab eventKey="course" title="Course">
              <Table>
                    <thead className="thead-dark">
                        <tr>
                            <th>Course ID</th>
                            <th>Topic</th>
                            <th>Teacher</th>
                            <th>Credit</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <CourseTable />
                </Table>
            </Tab>
          </Tabs>
      </div>
    )
  }
}

export default WebsiteStatus;