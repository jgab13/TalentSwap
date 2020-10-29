import Course from "./course"
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