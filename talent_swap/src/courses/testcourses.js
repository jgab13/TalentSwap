import Course from "./course"
import pic0 from "./course0pic.jpg"
import pic1 from "./course1pic.jpg"
import pic2 from "./course2pic.jpg"

//feel free to add more courses and course properties
export const hardcodedCourses = [
	new Course(
		{
			id: 0,
			topic: "React",
			teacher: "User One",
			// teacher_id: 1,
			starttime: "11:00:00",
			endtime: "12:00:00",
			date: "2020-10-31",
			// duration: "1hr",
			credit: 1,
			capacity: 1,
			enrollment: 0,
			pic: pic0,
			level: "intermediate"
		}
	),
	new Course(
		{
			id: 1,
			topic: "Using Functions in JavaScript",
			teacher: "User One",
			// teacher_id: 1,
			starttime: "13:00:00",
			endtime: "15:00:00",
			date: "2020-11-31",
			credit: 1,
			capacity: 10,
			enrollment: 10, 
			pic: pic1, 
			level: "all-level"
		}
	),
	new Course(
		{
			id: 2,
			pic: pic2,
			level: "beginner",
			topic: "Introduction to Cognitive Science",
			teacher: "User Two",
			// teacher_id: 2,
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