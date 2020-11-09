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
			teacher: "User Two",
			// teacher_id: 1,
			starttime: new Date('November 07, 2020 13:00:00'),
			endtime: new Date('November 08, 2020 14:00:00'),
			// date: "2020-11-11",
			// duration: "1hr",
			credit: 1,
			capacity: 2,
			enrollment: 1,
			pic: pic0,
			description: "Introduction to the react framework for building single page web applications. A great course for users who are already familiar with javascript.",
			level: "intermediate"
		}
	),
	new Course(
		{
			id: 1,
			topic: "Using Functions in JavaScript",
			teacher: "User One",
			// teacher_id: 1,
			starttime: new Date('November 31, 2020 14:00:00'),
			endtime: new Date('November 31, 2020 15:00:00'),
			// date: "2020-11-31",
			credit: 1,
			capacity: 5,
			enrollment: 4, 
			pic: pic1, 
			description: "This course introduces event handling, arrow functions, binding, functional array methods and more tips and tricks to become a great javascript programmer!",
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
			starttime: new Date('November 01, 2020 13:00:00'),
			endtime: new Date('November 01, 2020 15:00:00'),
			// date: "2020-11-01",
			rate: 4,
			credit: 10,
			capacity: 10,
			enrollment: 8,
			description: "Welcome to introduction to cognitive science. This class explores the history and philosophy of the mind, important concepts in cognitive psychology such as intelligence, attention, memory and categorization, and important developments in the burgeoning field of artificial intelligence.",
			level: "beginner"
		}
	),
	new Course(
		{
			id: 3,
			topic: "Guitar lessons",
			teacher: "User Two",
			// teacher_id: 1,
			starttime: new Date('November 21, 2020 13:00:00'),
			endtime: new Date('November 21, 2020 15:00:00'),
			// date: "2020-10-31",
			credit: 1,
			capacity: 1,
			enrollment: 0, 
			pic: pic1, 
			description: "This course introduces event handling, arrow functions, binding, functional array methods and more tips and tricks to become a great javascript programmer!",
			level: "beginner"
		}
	),
	new Course(
		{
			id: 4,
			topic: "Musical Theory",
			teacher: "User One",
			// teacher_id: 1,
			starttime: new Date('November 15, 2020 13:00:00'),
			endtime: new Date('November 15, 2020 15:00:00'),
			// date: "2020-10-31",
			credit: 1,
			capacity: 1,
			enrollment: 0, 
			pic: pic1, 
			description: "This course introduces event handling, arrow functions, binding, functional array methods and more tips and tricks to become a great javascript programmer!",
			level: "all-level"
		}
	)
]