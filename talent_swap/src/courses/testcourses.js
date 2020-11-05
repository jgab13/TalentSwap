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
			capacity: 1,
			enrollment: 0
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
			capacity: 10,
			enrollment: 10
		}
	),
	new Course(
		{
			id: 2,
			topic: "Introduction to Cognitive Science",
			teacher: "user2",
			starttime: "13:00:00",
			endtime: "15:00:00",
			date: "2020-11-01",
			rate: 4,
			credit: 10,
			capacity: 10,
			enrollment: 8,
			description: "Welcome to introduction to cognitive science. This class explores the history and philosophy of the mind, important concepts in cognitive psychology such as intelligence, attention, memory and categorization, and important developments in the burgeoning field of artificial intelligence."
		}
	)
]