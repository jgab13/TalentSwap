# team15 
# Talent Swap

## Instructions

Please use this URL to access our web application xxxxx.

### Functionality

#### Visitor Functionality 
The following functionality is applicable to all users (visitors, regular users and admin users). The home page is accessible by all users. The header contains a search bar, a logo and a join now button. The home page displays basic information about our application as well as a list of popular courses. 

All users can click a course. This will direct the user to the detailed course page which includes a description of the course, course dates, enrollment data and credit cost to take the course. If the course has been completed, the user will be able to read reviews and see ratings of the course, If the course has not been completed and the course is not full, users can click the enabled enroll button. They will be prompted to log in or sign up. 

All users can also use the search bar to filter courses based on keyword search. Once again, the filtered results can be clicked, which will redirect the user to the detailed course page.

#### Regular user Functionality

In addition to the functionality described above, a regular user (who has signed in after signing up for the application) has access to the user dashboard. A regular user can modify the user's profile information such as name, interests and expertise. The regular user can also view courses that the user is taking or teaching by clicking on the course thumbnail in the user dashboard.

The regular user also has access to header pathways learn and teach. The learn pathway allows the user to search for new courses, view past courses taken and view upcoming courses that the user has enrolled in. The teach pathway allows a user to create a new course that the user will teach.

Users can enroll in courses if they have enough credits to pay the credit cost of the course. Once the course has completed, enrolled users can add, edit or delete reviews to the course. User who have created a course to teach can modify the details of the upcoming course. 

Users also have the ability to communicate via the messaging system. By clicking the envelope icon in the top right corner or the header, the user will have acesss to the messages sent and received to other users. 

#### Admin user Functionality

In addition to the visitor functionality, an admin user has access to the admin dashboard. The dashboard provides statistics about the application. An admin can ban a user or delete a course by clicking on the course page. A delete button will be present which the admin user can click. Admin users cannot create or enroll in courses.

### Overview of the Routes

#### Course routes

##### Create course 'api/courses'

##### Update course 'api/courses/update/:id'

##### Get all courses 'api/courses'
This API route is used by the home page and search components to retrieve all courses and display them in thumbnails. This route does not require a request body and it returns a all of the course objects
from the db in the form '{"courses": "<course document>", "<course document>"}'.

##### Get a course 'api/courses/:id'
This API route is used when a course thumbnail is clicked. The id is passed to the detailed course page which retrieves the course from the db to populate course information. The route does not require a request body. The request parameters require a valid course object id. The route returns the course from the db in the form '{"course": "<course document>"}'.

##### Delete a course 'api/courses/:id'
This API is used by admin users to delete courses. The route does not require a request body, but it requires a request parameter of a valid course object id. In order to use this route, a user must be logged in. Post a login request user the route describe in users below. Once a cookie has been created, this API route can be used. The route returns the deleted course.

##### Create a review 'api/courses/:id'
This API route is used by regular users who have enrolled in a completed course to add a review. This route requires a request parameter of a valid course object id, a request body as follows.
{
	"user": "<username>",
	"date": "<MM-DD-YYYY>",
	"description": "<description>",
	"rating": "<number>"
}
The route returns the course object with the new review in the ratings property of the course.

##### Edit a review 'api/courses/:id'
This API route is used by regular users who have enrolled in a completed course and already reviewed the course, to edit their existing review. This route requires a request parameter of a valid course object id, a request body as follows.
{
	"user": "<username>",
	"date": "<MM-DD-YYYY>",
	"description": "<description>",
	"rating": "<number>"
}
The route returns the course object with the editted review in the ratings property of the course.

##### Delete a review 'api/courses/review/:id'
This API route is used by regular users who have enrolled in a completed course and already reviewed the course, to delete their existing review. This route requires a request parameter of a valid course object id, a request body as follows.
{
	"user": "<username>",
}

The route returns the course object. The review of the user will not be in the ratings property of the course.

#### Enrollment routes


#### Message routes


#### User routes

