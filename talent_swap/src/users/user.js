class User {
    constructor(json=null) {
        this.id = null;
        this.name = null;
        this.credits = null;
        this.bio = null;
        this.expertise = null;
        this.development = null;
        this.coursesTeaching = null;
        this.coursesLearning = null;
        Object.assign(
            this,
            typeof json === "string" ? JSON.parse(json) : json
        );
    }
}

export default User;