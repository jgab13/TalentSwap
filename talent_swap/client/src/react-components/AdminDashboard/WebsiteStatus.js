import React from "react";

import { Table, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCourses } from "../../actions/course.js";
import UserManager from "./../../users/user-manager";

export class UserTable extends React.Component {
  state = {
    users: null
  }
  async componentDidMount() {
    const users = await UserManager.getAllUsers();
    this.setState({users: users});
  }
  render() {
    if (!this.state.users) {
      return <div></div>
    }
    return(
      <tbody>
      {this.state.users.map((user) => (
      <tr>
        <td><Link to= {{pathname:`/UserProfile/${user.username}`}} >
                  {user.username}
            </Link></td>
        <td>{user.name}</td>
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
                            <th>Username</th>
                            <th>Name</th>
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