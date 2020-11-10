# team15 

Please note that for the first phase of this project, we have hardcoded user, course, enrollment, review and other data in various components of our app. The flow described below takes that into account and demonstrates the functionality and UI of our app for this phase of the project. 

## Visitor Flow

The default of state of our web app on the home page is logged in. Therefore, please click user and then log out from the drop down to begin the visitor flow. A visitor can view the course details of a course on the home page or from the search page. The search page can be accesssed by clicking the search button in the header. If the course has not completed yet, then the visitor can click on the enrol button on the course details page and the visitor will be prompted with the login or sign up pop up. The visitor can cancel the pop up and navigate back to home page, sign in using his/her credentials or sign up as a new user. 

Since our data is hardcoded, please click on the guitar lessons view course details button on the search page to see this functionality. The visitor will see the course name, description, teacher, the start and end time, the number of spots remaining in the course and the credit cost. The enroll now button will be displayed and can be clicked by the visitor.

Navigate back to the home page by clicking the logo in the top left corner of the header or click the search button to navigate to the search page. Please click the search button to begin the search page flow.

### Search Page flow

The search page flow applies to all users including visitors. The courses are listed in the course tab and can be filtered by entering a key word in the search input box in the header or by selecting one of the drop down items in the level, availability and class size filters. To test the filters, please select one of the filter labels to see this functionality. For phase 1, you cannot select multiple filters such as a level filter and an availability filter. This will be corrected in phase 2. To remove the filter, click clear filter to see all of the search page results. To test the search input box, enter a keyword such as react and click the search button to see the filtering. On the user tab, a thumbnail of the web app users will be displayed. A user can use the search input box to filter on a specific user. 

Navigate back to the home page to begin the admin flow.

## Admin flow

On the home page, click user -> log out. Then click join now and enter user credentials admin/admin. This will redirect you to the admin dashboard. On the dashboard, an admin user can ban/unban users. Enter in user id 1 or 2 to see this functionality. The user can be unbanned as well by clicking the unban button. The admin dashboard shows website status details such as a list of courses and users. Clicking on a user or course will navigate to the user profile or the course page. While an admin user can view course details and delete a course, the admin cannot enroll, edit or review the course. 

Since our data is hardcoded, please click on the musical theory course to demonstrate the functionality of the admin user. The course detail page will display the typical details, however, a red delete button will appear underneath a disabled enroll now button. By clicking the delete button, the admin user will see an alert indicating that the course has been deleted and the user will be directed back to the admin dashboard. Since the data is hardcoded, the musical theory course will still appear in the course list under website status. This will be removed in phase 2.

Navigate back to the home page to begin the user flow.

## User Flow

### Authentication System

Since in Phase1, we cannot fetch cookies from browser, the login status is hardcoded as true. To test the authentication system, please click on the "User" scroll down button, and log out. No matter what page you are at, this will bring you back to homepage with a "Join Now" button on the header. Click on the button to see the popup authentication system.

There are two normal users, with username: user, password: user and username: user2, password: user2, and one admin user, with username: admin, password: admin. After click "Log In", a valid user will be redirected to user dashboard, where most information can be editted. A valid admin will be redirected to admin dashboard. A user with wrong username/password pair or a banned user cannot log in.

Also, click on "Sign Up" button besides "log in" will lead you to sign up for the website. Notice that since user information is hardcoded, a registered user can not log in with newly set username and password.

### User Profile

After logging in, you will be directed to the user profile, which will display editable user information, courses you are enrolled in or courses you are teaching. To access this part of the app, you must be signed in. So, please try to access this feature right after logging in.

Alternatively, you can type the URL `/UserProfile/{userId}` where `userId` some integer. Currently, the 2 valid ids are `1` and `2`. This will allow you to view the user profile of that user, but not edit.

Note that this is a SPA so changing the URL in this manner will log you out. We have not yet implemented cookies/jwt/some other way to persist user identity beyond storing it in memory.

If you find yourself logged out, please log in again.

### Messaging

You can click the message icon on the nav bar in the top right. This will bring you to the messaging system. This page is divided into two columns, the left side denotes the users you have recently chatted with. The right side denotes the messages themselves. You can send messages by typing into the input box and clicking "Send".

In Phase 2, the plan is to have live updates to the messaging system (possibly with Socket.io).

There are messages between User One and User Two. To access these messages, you must be signed in. So, please try to access this feature right after logging in.

### Learn 

A logged in user can access courses from the home page, search page or their user profile. To demonstrate this functionality, please click on the introduction to cognitive science view course details button. The user will see the course details page. The user was enrolled in the class, the class completed and the user provided a review. The user can edit/delete his or her review by clicking the appropriate buttons besider the review. Clicking delete will remove the review and the user can click the add review button to provide a new review. If the user tries to submit blank information in the review date and description input boxes in the add review pop up, or a number less than 0 or greater than 5 in the star rating input box, the user will see validation error messages. The user can click the cancel button to close the pop up. The user can add a new review by entering any text in the review description input box, a 5 star review number and a date in the format MM-DD-YYYY. Please enter a review in this format and click submit. The user will then be able to edit or delete that review.

Additionally, navigating from the home page or search page, please click on the Using Functions in JavaScript view course details button. The user will see the course details page. In this case, the user was not enrolled in the course and there is availability in the enrollment. The user can click enroll now to sign up for the class. Note that the button will be greyed out with the message class full and the enrollment will be 5 of 5 (enrollment equal to the capacity of the course).

Under the learn drop down in the header, a user can click find a course, view past coures and view upcoming courses. Clicking find a course navigates to the search page. The other items navigate to the search page, filtered on upcoming and completed courses.

### Teach

A user who taught a course can view the course by clicking on the view course details thumbnail on their profile, the home page or the search page. Please click on the React view course details button to see this functionality. The user taught this course, the course completed and the user received ratings and feedback. The course detail page will basically be a read-only for the teacher user to see the information about the completed course. There will not be any buttons for the user to click to edit the course, the review and the class completed button will be disabled.

A user can create a new course by clicking on the "Teach" scroll down button and choose "Create a New Course". The user will be redirected to course creation page to input basic information of new courses. After click submit, the user will be redirected to a detailed course page. This page is for course holder to view their upcoming courses specifically, where the teacher can view and edit detailed information. Notice that since data is hardcoded, this page is not the same as user input. 

Under the teach drop down in the header, similar to the learn drop down, a user can also click view past courses and view upcoming courses. Clicking either of these items directs to the search page filtered for upcoming or past courses that the user teaches.

### Search
Start searching from any page on our website by typing in your keywords in the search box and then click the search button. Results of your search include two data categories: users and courses, displayed under the "Users" and "Courses" tabs respectively. 
If no keywords are specified, all existing courses and users are shown as search results. You can filter those courses based on difficulty levels, availability, or class size. For example, if you're happy with both beginner-level and all-level courses, you can select them at the same time to see all the courses that are marked as either beginner-level or all-level. 
If keywords are specified, courses which have your keywords as substring in their title will be returned. Users who have your keywords as substring in their name,  domain of expertise, or domain of development will be returned. Search keywords that are shorter and more general get more results. For example, if you search "JavaScriptX", nothing will be returned. But if you search "Java", then one course and one user will be returned.  

## Dependencies

This is a list of third-party libraries we used:

- "react-router-dom": "^5.2.0",
- "react-bootstrap": "^1.4.0",
- "bootstrap": "^4.5.3",
- "react-star-ratings": "^2.3.0",
