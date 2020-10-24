class User {
    constructor(json=null) {
        this.id = 0;
        this.name = "";
        this.credits = 0;
        this.bio = "";
        this.expertise = "";
        this.development = "";
        this.coursesTeaching = [];
        this.coursesLearning = [];
        Object.assign(
            this,
            typeof json === "string" ? JSON.parse(json) : json
        );
    }

    changeName = (newName) => {
        this.name = newName;
        return true;
    };

    changeBio = (newBio) => {
        this.bio = newBio;
        return true;
    };

    changeExpertise = (newExpertise) => {
        this.expertise = newExpertise;
        return true;
    };

    changeDevelopment = (newDevelopment) => {
        this.development = newDevelopment;
        return true;
    };
}

export default User;