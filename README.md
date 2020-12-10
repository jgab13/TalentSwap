# team15 
# Talent Swap

## Instructions

Please use this URL to access our web application http://talent-swap-uoft.herokuapp.com/.

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

##### Get all courses: GET '/api/courses'
This API route is used by the home page and search components to retrieve all courses and display them in thumbnails. This route does not require a request body and it returns a all of the course objects
from the db in the form '{"courses": {"course document"}, {"course document"}}'.

##### Get a course: GET '/api/courses/:id'
This API route is used when a course thumbnail is clicked. The id is passed to the detailed course page which retrieves the course from the db to populate course information. The route does not require a request body. The request parameters require a valid course object id. The route returns the course from the db in the form '{"course": "course document"}'.

##### Delete a course: DELETE '/api/courses/:id'
This API is used by admin users to delete courses. The route does not require a request body, but it requires a request parameter of a valid course object id. In order to use this route, a user must be logged in. Post a login request user the route describe in users below. Once a cookie has been created, this API route can be used. The route returns the deleted course.

##### Create a review: POST '/api/courses/:id'
This API route is used by regular users who have enrolled in a completed course to add a review. This route requires a request parameter of a valid course object id, a request body as follows.
{
	"user": "username",
	"date": "MM-DD-YYYY",
	"description": "description",
	"rating": "number"
}
The route returns the course object with the new review in the ratings property of the course.

##### Edit a review: PATCH '/api/courses/:id'
This API route is used by regular users who have enrolled in a completed course and already reviewed the course, to edit their existing review. This route requires a request parameter of a valid course object id, a request body as follows.
{
	"user": "username",
	"date": "MM-DD-YYYY",
	"description": "description",
	"rating": number
}
The route returns the course object with the editted review in the ratings property of the course.

##### Delete a review: DELETE '/api/courses/review/:id'
This API route is used by regular users who have enrolled in a completed course and already reviewed the course, to delete their existing review. This route requires a request parameter of a valid course object id, a request body as follows.
{
	"user": "username"
}

The route returns the course object. The review of the user will not be in the ratings property of the course.

#### Enrollment routes

##### Enrol in a course: POST '/api/enrollment'
This API route is used by regular users to enroll in a course. The route requires a request body as follows.
{
	"courseId": "valid courseID"
}

The route returns the user and course objects as properties.

##### Unenrol in a course: POST '/api/unenroll'
This API route is used by regular users to unenroll in a course that has been previously enrolled in. The route requires a request body as follows.
{
	"courseId": "valid courseID"
}

The route returns the user and course objects as properties.

#### Message routes

##### Send Message: POST '/api/messages'

This route sends a message. User should already be logged in with session.

Request body should be:
```
{
	"target": "user2",
	"contents": "Hello world!!!"
}
```

Response is the newly created message:

```
{
    "_id": "5fd1869f551af90d3e15f7c6",
    "senderName": "user",
    "receiverName": "user2",
    "contents": "Hmm",
    "timestamp": 1607567007916,
    "__v": 0
}
```

##### Get Message For Specific User: GET '/api/messages/:target'

This route gets all messages to and from a corresponding user. User sending request should be logged in with session.

Response (if target is user2 and you are user):
```
[
	{
		"_id": "5fd1869f551af90d3e15f7c6",
		"senderName": "user",
		"receiverName": "user2",
		"contents": "Hmm",
		"timestamp": 1607567007916,
		"__v": 0
	}
]
```

##### Get All Contacts GET '/api/message-contacts'

Gets a list of usernames of the people you have sent messages to or received messages from.

Response:
```
[
    "admin",
    "user2"
]
```

#### User routes

##### Login: POST '/users/login'

This api route is used for users to login and create the session.

Request body should be:
```
{
	"username": "user",
	"password": "user"
}
```

Response: User object if successful:

```
{
    username: "user",
    userType: "user",
    name: "User 1",
    credits: 10,
    bio: "I am a user!",
    expertise: "Python Javascript",
    development: "React Rust",
    coursesTeaching: [],
    coursesLearning: [],
    pic: "some image encoded as base 64"
}
```

##### Logout: GET '/users/logout'

This api route is used to logout users and delete the session.

##### Check Session: GET '/users/check-session'

This api route is used to check the session.

Response if successful is:

```
{
	"currentUser": "username"
}
```

##### Register: POST '/api/users'

This api route is used to register new accounts.

Request body should be:
```
{
	"username": "user",
	"password": "user"
}
```

Response: User object if successful:

```
{
    username: "user",
    userType: "user",
    name: "User 1",
    credits: 10,
    bio: "I am a user!",
    expertise: "Python Javascript",
    development: "React Rust",
    coursesTeaching: [],
    coursesLearning: [],
    pic: "some image encoded as base 64"
}
```

##### Update User: PATCH '/api/users'

This api route is used to change account properties. User must already be logged in with a session.

Request body can include any number of parameters to change with the new values.
```
{
	"name": "New name",
	"bio": "New bio",
	"expertise": "New expertise",
	"development": "New development",
	"pic": "New base64 encoded picture"
}
```

Response: Updated user object if successful:

```
{
    username: "user",
    userType: "user",
    name: "New name",
    credits: 10,
    bio: "New bio",
    expertise: "New expertise",
    development: "New development",
    coursesTeaching: [],
    coursesLearning: [],
    pic: "New base64 encoded picture"
}
```

##### Get All Users: GET '/api/users'

This api route is used to get all users.

Response: List of all user object if successful:

```
[
	{
		username: "user",
		userType: "user",
		name: "User 1",
		credits: 10,
		bio: "I am a user!",
		expertise: "Python Javascript",
		development: "React Rust",
		coursesTeaching: [],
		coursesLearning: [],
		pic: "some image encoded as base 64"
	},
	{
		username: "user2",
		userType: "user",
		name: "User 2",
		credits: 10,
		bio: "I am another user!",
		expertise: "Java C#",
		development: "Python",
		coursesTeaching: [],
		coursesLearning: [],
		pic: "some image encoded as base 64"
	}
]
```

##### Get User: GET '/api/users/:username'

This route is used to get a specific User from the specified username.

Response: Updated user object if successful (for example if we do `GET '/api/users/user'`):

```
{
    username: "user",
    userType: "user",
    name: "New name",
    credits: 10,
    bio: "New bio",
    expertise: "New expertise",
    development: "New development",
    coursesTeaching: [],
    coursesLearning: [],
    pic: "New base64 encoded picture"
}
```

#### Admin Routes

##### Ban User: POST '/api/banned'

This route is used by the admin to ban a user. Admin should be logged in with session.

Request body should be:

```
{
    username: "user2"
}
```

Reponse is the new Ban object:

```
{
    "_id": "5fd18e0e2e44e80f44afc39b",
    "bannedUsername": "user2",
    "timestamp": 1607568910873,
    "adminUsername": "admin",
    "__v": 0
}
```

##### Unban User: DELETE '/api/banned'

This route is used by the admin to unban a user. Admin should be logged in with session.

Request body should be:

```
{
    username: "user2"
}
```

Reponse is the Ban object that was deleted:

```
{
    "_id": "5fd18e0e2e44e80f44afc39b",
    "bannedUsername": "user2",
    "timestamp": 1607568910873,
    "adminUsername": "admin",
    "__v": 0
}
```

##### Get All Banned Users: GET '/api/banned'


This route is used by the admin to get all banned users. Admin should be logged in with session.

Reponse is an array of Ban objects:

```
[
    {
        "_id": "5fd18e0e2e44e80f44afc39b",
        "bannedUsername": "user2",
        "timestamp": 1607568910873,
        "adminUsername": "admin",
        "__v": 0
    }
]
```