# team15 

## Visitor Flow

A visitor can view the course details of a course on the home page or from the search page. If the course has not completed yet, then the visitor can click on the enrol button on the course details page and the visitor will be prompted with the login or sign up pop up. The visitor cancel the pop up and navigate back to home page, sign in using his/her credentials or sign up as a new user. 

Since our data is hardcoded, please click on the guitar lessons view course details button to see this functionality. The visitor will see the course name, description, teacher, the start and end time, the number of spots remaining in the course and the credit cost. The enroll now button will be displayed and can be clicked by the visitor. 

## Admin flow

An admin user can view course details of a course. The admin user cannot enroll, edit or review the course, however, the admin can delete the course. 

From the admin dashboard, the admin can select course under website status and click on the a course to view the details. Since our data is hardcoded, please click on the musical theory course to demonstrate the functionality of the admin user. The course detail page will display the typical details, however, a red delete button will appear underneath a disabled enroll now button. By clicking the delete button, the admin user will see an alert indicating that the course has been deleted and the user will be directed back to the admin dashboard. Since the data is hardcoded, the musical theory course will still appear in the course list under website status. This will be removed in phase 2.

## User Flow

### Messaging

### Learn 

A logged in user can access courses from the home page, search page or their user profile. To demonstrate this functionality, please click on the introduction to cognitive science view course details button. The user will see the course details page. The user was enrolled in the class, the class completed and the user provided a review. The user can edit/delete his or her review by clicking the appropriate buttons besider the review. Clicking delete will remove the review and the user can click the add review button to provide a new review. If the user tries to submit blank information in the review date and description input boxes in the add review pop up, or a number less than 0 or greater than 5 in the star rating input box, the user will see validation error messages. The user can click the cancel button to close the pop up. The user can add a new review by entering any text in the review description input box, a 5 star review number and a date in the format MM-DD-YYYY. Please enter a review in this format and click submit. The user will then be able to edit or delete that review.

Additionally, navigating from the home page or search page, please click on the Using Functions in JavaScript view course details button. The user will see the course details page. In this case, the user was not enrolled in the course and there is availability in the enrollment. The user can click enroll now to sign up for the class. Note that the button will be greyed out with the message class full and the enrollment will be 5 of 5 (enrollment equal to the capacity of the course).

### Teach

A user who taught a course can view the course by clicking on the view course details thumbnail on their profile, the home page or the search page. Please click on the React view course details button to see this functionality. The user taught this course, the course completed and the user received ratings and feedback. The course detail page will basically be a read-only for the teacher user to see the information about the completed course. There will not be any buttons for the user to click to edit the course, the review and the class completed button will be disabled. 
