import React from "react";
import { hardcodedCourses } from "./../../courses/testcourses.js"
import { hardCodedUsers } from "./../../users/user-manager.js"

import { Table, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const user = hardCodedUsers;
const course = hardcodedCourses;

export class UserTable extends React.Component {
  render() {
    return(
      <tbody>
      {user.map((user) => (
      <tr>
        <td>{user.id}</td>
        <td><Link to= {{pathname:`/UserProfile/${user.id}`}} >
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
  render() {
    return(
      <tbody>
      {course.map((course) => (
      <tr>
        <td>{course.id}</td>
        <td><Link to= {{
                        pathname: '/DetailedCoursePage',
                        state: {
                          course: course}
                      }} >
                  {course.topic}
            </Link></td>
        <td>{course.teacher}</td>
        <td>{course.credit}</td>
        <td>{course.status}</td>
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