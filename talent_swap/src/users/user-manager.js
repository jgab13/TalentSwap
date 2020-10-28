import User from "./user";

const hardCodedUser = new User({
    id: 1,
    name: "User One",
    credits: 0,
    bio: "Empty Bio",
    expertise: "",
    development: "",
    coursesTeaching: [],
    coursesLearning: []
});

class UserManager {
    static login(username, password) {
        if (username === "user" && password === "user") {
            return hardCodedUser;
        }
    }
}

export default UserManager;