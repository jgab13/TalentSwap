class Course {
	constructor(json=null) {
		this.topic = "";
		this.teacher = "";
		this.starttime = "";
		this.endtime = "";
		this.date = "";
		this.credit = 0;
		this.capacity = 0;

		this.rate = 0;
		this.area = "";
		this.description = "";
		Object.assign(
            this,
            typeof json === "string" ? JSON.parse(json) : json
        );
	}

	//changeProperties goes here
}

export default Course;