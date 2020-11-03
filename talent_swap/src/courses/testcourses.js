import Course from "./course"

//feel free to add more courses and course properties
export const hardcodedCourses = [
	new Course(
		{
			id: 0,
			topic: "React",
			teacher: "Alice",
			starttime: "11:00:00",
			endtime: "12:00:00",
			date: "2020-10-31",
			credit: 1,
			capacity: 1
		}
	),
	new Course(
		{
			id: 1,
			topic: "JS",
			teacher: "Bob",
			starttime: "13:00:00",
			endtime: "15:00:00",
			date: "2020-11-31",
			credit: 1,
			capacity: 10
		}
	)
]