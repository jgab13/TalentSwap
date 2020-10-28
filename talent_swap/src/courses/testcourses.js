import Course from "./course"


export const hardcodedCourses = [
	new Course(
		{
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