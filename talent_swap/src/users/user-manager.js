import User from "./user";

hardCodedUsers = [
    new User({
        id: 1,
        name: "User One",
        credits: 0,
        bio: "Empty Bio",
        expertise: "",
        development: "",
        coursesTeaching: [],
        coursesLearning: []
    }),
    new User({
        id: 2,
        name: "User Two",
        credits: 0,
        bio: "Empty Bio",
        expertise: "",
        development: "",
        coursesTeaching: [],
        coursesLearning: []
    })
]

class UserManager {
    static login(username, password) {
        if (username === "user" && password === "user") {
            return hardCodedUsers[0];
        } else if (username === "user1" && password === "user1") {
            return hardCodedUsers[1];
        }
    }
}

export default UserManager;