# team15 
# Talent Swap

## Instructions

Please use this URL to access our web application http://talent-swap-uoft.herokuapp.com/.

### Functionality

#### Visitor Functionality 
The following functionality is applicable to all users (visitors, regular users and admin users). The home page is accessible by all users. The header contains a search bar, a logo and a join now button. The home page displays basic information about our application as well as a list of popular courses. 

All users can click a course. This will direct the user to the detailed course page which includes a description of the course, course dates, enrollment data and credit cost to take the course. If the course has been completed, the user will be able to read reviews and see ratings of the course, If the course has not been completed and the course is not full, users can click the enabled enroll button. They will be prompted to log in or sign up. 

All users can also use the search bar to filter courses and users based on keyword search. Once again, the filtered results can be clicked, which will redirect the user to the detailed course page or another user's profile page.

#### Regular user Functionality

In addition to the functionality described above, a regular user (who has signed in after signing up for the application) has access to the user dashboard. A regular user can modify the user's profile information such as name, interests and expertise. The regular user can also view courses that the user is taking or teaching by clicking on the course thumbnail in the user dashboard.

The regular user also has access to header pathways learn and teach. The learn pathway allows the user to view past courses taken and view upcoming courses that the user has enrolled in. The teach pathway allows a user to create a new course that the user will teach.

Users can enroll in courses if they have enough credits to pay the credit cost of the course. Once the course has completed, enrolled users can add, edit or delete reviews to the course. User who have created a course to teach can modify the details of the upcoming course. 

Users also have the ability to communicate via the messaging system. By clicking the envelope icon in the top right corner or the header, the user will have acesss to the messages sent and received to other users. 

#### Admin user Functionality

In addition to the visitor functionality, an admin user has access to the admin dashboard. The dashboard provides statistics about the application. An admin can ban a user or delete a course by clicking on the course page. A delete button will be present which the admin user can click. Admin users cannot create or enroll in courses.

### Overview of the Routes

#### Course routes

##### Create course POST 'api/courses'
This API is used to create a new course when a user inputs all needed information in front end course creation page. All values are sent in request body, and this route takes the input values, create a new course, push it into database and send the course in response.

Request body should be:
```
{
    "topic": "some topic",
    "teacher": "a teacher",
    ... // it is a long list, so not all fields are included
}
```

Response: Course object if successful:
```
{
    "topic": "some topic",
    "teacher": "a teacher",
    ... // it is a long list, so not all fields are included
}
```

##### Update course PATCH 'api/courses/update/:id'
This API is used to update a course. Course id is passed through request parameters, and the fileds that need to be updated and their values are sent in request body as two seperate lists. The updated course is sent in response.

Request body should be:
```
{
    "attr": [], // a list of fields that need to be updated
    "newValue": [] // corresponding new values
}
```

Response: New course object if successful:
```
{
    "topic": "new topic",
    "teacher": "a teacher",
    ... // it is a long list, so not all fields are included
}
```

##### Get all courses: GET '/api/courses'
This API route is used by the home page and search components to retrieve all courses and display them in thumbnails. This route does not require a request body and it returns a all of the course objects
from the db in the form 
```
{
    "courses": 
        {
            "topic": "new topic",
            "teacher": "a teacher",
            ... // it is a long list, so not all fields are included
        }, 
        {
            "topic": "new topic",
            "teacher": "a teacher",
            ... // it is a long list, so not all fields are included
        }
}
```

##### Get courses by keyword: GET '/api/courses/keyword=:key'
This API route is used by the search components to retrieve all the courses related to the keyword. This route does not require a request body and it returns all the matched course objects from the db in the form. 
```
{"courses": {"course document"}, {"course document"}}
```

##### Get a course: GET '/api/courses/:id'
This API route is used when a course thumbnail is clicked. The id is passed to the detailed course page which retrieves the course from the db to populate course information. The route does not require a request body. The request parameters require a valid course object id. The route returns the course from the db in the form.

```
{
    "course": {
        "enrolledUsers": [],
        "_id": "5fd0e788ad623a0a64e7a992",
        "topic": "JG's courses",
        "teacher": "JG",
        "starttime": "2020-12-01T05:00:00.000Z",
        "endtime": "2020-12-10T05:00:00.000Z",
        "credit": 10,
        "level": "beginner",
        "capacity": 1,
        "enrollment": 0,
        "rate": 0,
        "description": "Do not use",
        "ratings": [],
        "__v": 13
    }
}
```

##### Delete a course: DELETE '/api/courses/:id'
This API is used by admin users to delete courses. The route does not require a request body, but it requires a request parameter of a valid course object id. In order to use this route, a user must be logged in. Post a login request in the user routes section described below. Once a cookie has been created, this API route can be used. The route returns the deleted course as shown below.

```
{
    "enrolledUsers": [],
    "_id": "5fd0e788ad623a0a64e7a992",
    "topic": "JG's courses",
    "teacher": "JG",
    "starttime": "2020-12-01T05:00:00.000Z",
    "endtime": "2020-12-10T05:00:00.000Z",
    "credit": 10,
    "level": "beginner",
    "capacity": 1,
    "enrollment": 0,
    "rate": 0,
    "description": "Do not use",
    "ratings": [],
    "__v": 13
}
```

##### Create a review: POST '/api/courses/:id'
This API route is used by regular users who have enrolled in a completed course to add a review. This route requires a request parameter of a valid course object id, a request body as follows. In order to use this route, a user must be logged in. Post a login request in the user routes section described below.
```
{
    "user": "MG",
    "date": "10-12-2020",
    "description": "Loved the course",
    "rating": 4
}
```
The route returns the course object with the new review in the ratings property of the course.
```
{
    "course": {
        "enrolledUsers": [
            "JG"
        ],
        "_id": "5fd177a4e1cada33681c7042",
        "topic": "MG's test",
        "teacher": "MG",
        "starttime": "2020-12-10T01:19:00.000Z",
        "endtime": "2020-12-10T01:24:00.000Z",
        "credit": 2,
        "level": "Intermediate",
        "capacity": 10,
        "enrollment": 1,
        "rate": 5,
        "description": "klasdlkklafsdf",
        "picture": "",
        "ratings": [
            {
                "_id": "5fd185a44999ed2c60bec186",
                "user": "JG",
                "date": "2020-12-10T05:00:00.000Z",
                "description": "lkfglslkgfdgdg",
                "rating": 5
            },
            {
                "_id": "5fd237dfc62a4b16accc0434",
                "user": "MG",
                "date": "2020-10-12T04:00:00.000Z",
                "description": "Loved the course",
                "rating": 4
            }
        ],
        "__v": 5
    }
}
```

##### Edit a review: PATCH '/api/courses/:id'
This API route is used by regular users who have enrolled in a completed course and already reviewed the course, to edit their existing review. This route requires a request parameter of a valid course object id, a request body as follows. Post a login request in the user routes section described below to use this route. The user must match a user who has reviewed the course already.
```
{
    "user": "MG",
    "description": "test",
    "rating": 2,
    "date": "2020-10-11"
}
```
The route returns the course object with the editted review in the ratings property of the course.
```
{
    "course": {
        "enrolledUsers": [
            "JG",
            "MG"
        ],
        "_id": "5fd177a4e1cada33681c7042",
        "topic": "MG's test",
        "teacher": "MG",
        "starttime": "2020-12-10T01:19:00.000Z",
        "endtime": "2020-12-10T01:24:00.000Z",
        "credit": 2,
        "level": "Intermediate",
        "capacity": 10,
        "enrollment": 1,
        "rate": 5,
        "description": "klasdlkklafsdf",
        "picture": "",
        "ratings": [
            {
                "_id": "5fd185a44999ed2c60bec186",
                "user": "JG",
                "date": "2020-12-10T05:00:00.000Z",
                "description": "lkfglslkgfdgdg",
                "rating": 5
            },
            {
                "_id": "5fd237dfc62a4b16accc0434",
                "user": "MG",
                "date": "2020-10-11T00:00:00.000Z",
                "description": "test",
                "rating": 2
            }
        ],
        "__v": 5
    }
}
```

##### Delete a review: DELETE '/api/courses/review/:id'
This API route is used by regular users who have enrolled in a completed course and already reviewed the course, to delete their existing review. This route requires a request parameter of a valid course object id, a request body as follows. Post a login request in the user routes section described below to use this route. The user must match a user who has reviewed the course already.
```
{
	"user": "MG"
}
```

The route returns the course object. The review of the user will not be in the ratings property of the course.
```
{
    "enrolledUsers": [
        "JG",
        "MG"
    ],
    "_id": "5fd177a4e1cada33681c7042",
    "topic": "MG's test",
    "teacher": "MG",
    "starttime": "2020-12-10T01:19:00.000Z",
    "endtime": "2020-12-10T01:24:00.000Z",
    "credit": 2,
    "level": "Intermediate",
    "capacity": 10,
    "enrollment": 1,
    "rate": 5,
    "description": "klasdlkklafsdf",
    "picture": "",
    "ratings": [
        {
            "_id": "5fd185a44999ed2c60bec186",
            "user": "JG",
            "date": "2020-12-10T05:00:00.000Z",
            "description": "lkfglslkgfdgdg",
            "rating": 5
        }
    ],
    "__v": 6
}
```

#### Enrollment routes

##### Enrol in a course: POST '/api/enrollment'
This API route is used by regular users to enroll in a course. The route requires a request body as follows. Post a login request in the user routes section described below to use this route. The user must have enough credits to pay the credit cost of the course and not already be enrolled.
```
{
	"courseId": "5fd177a4e1cada33681c7042"
}
```
The route returns the user and course objects as properties.
```
{
    "user": {
        "coursesTeaching": [],
        "coursesLearning": [],
        "_id": "5fd0e76fad623a0a64e7a991",
        "username": "JG",
        "password": "$2a$10$XskI0gkxfWmjHeYOgTgHReNqksi47YSNB1Y3dGrUdgPDDfxhaVRoW",
        "userType": "user",
        "credits": 8,
        "__v": 0
    },
    "course": {
        "enrolledUsers": [
            "JG"
        ],
        "_id": "5fd177a4e1cada33681c7042",
        "topic": "MG's test",
        "teacher": "MG",
        "starttime": "2020-12-10T01:19:00.000Z",
        "endtime": "2020-12-10T01:24:00.000Z",
        "credit": 2,
        "level": "Intermediate",
        "capacity": 10,
        "enrollment": 1,
        "rate": 0,
        "description": "klasdlkklafsdf",
        "picture": "",
        "ratings": [],
        "__v": 7
    }
}
```

##### Unenrol in a course: POST '/api/unenroll'
This API route is used by regular users to unenroll in a course that has been previously enrolled in. The route requires a request body as follows. Post a login request in the user routes section described below to use this route. The user must already be enrolled in the course to unenroll.
```
{
	"courseId": "5fd177a4e1cada33681c7042"
}
```
The route returns the user and course objects as properties.
```
{
    "user": {
        "coursesTeaching": [],
        "coursesLearning": [],
        "_id": "5fd0e76fad623a0a64e7a991",
        "username": "JG",
        "password": "$2a$10$XskI0gkxfWmjHeYOgTgHReNqksi47YSNB1Y3dGrUdgPDDfxhaVRoW",
        "userType": "user",
        "credits": 10,
        "__v": 0
    },
    "course": {
        "enrolledUsers": [],
        "_id": "5fd177a4e1cada33681c7042",
        "topic": "MG's test",
        "teacher": "MG",
        "starttime": "2020-12-10T01:19:00.000Z",
        "endtime": "2020-12-10T01:24:00.000Z",
        "credit": 2,
        "level": "Intermediate",
        "capacity": 10,
        "enrollment": 0,
        "rate": 0,
        "description": "klasdlkklafsdf",
        "picture": "",
        "ratings": [],
        "__v": 6
    }
}
```

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
##### Get courses by keyword: GET '/api/users/keyword=:key'
This API route is used by the search components to retrieve all the users related to the keyword. This route does not require a request body and it returns all the matched user objects from the db in the form ```{"users": {"user document"}, {"user document"}}```.

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