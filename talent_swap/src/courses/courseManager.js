import Course from "./course"
import {hardcodedCourses} from "./testcourses.js"

//addCourse function is not required if everything is hardcoded
//the courseList is saved to every newly created course
//this is a bad idea, and we don't need it
//so just ignore it and use hardcoded courses
export const addCourse = courseManager => {
	console.log("adding course");
	const courseList = courseManager.state.courses;

	const json = courseManager.state;

	const course = new Course(json);

	course.id = courseList.length - 1;
	courseList.push(course);

	courseManager.setState({
		courses: courseList
	});
};

export const getCourse = courseId => {
	return hardcodedCourses.find(course => course.id === courseId);
}

//add your own functions here and export them as needed