import User from "./user";
import AdminUser from "./admin-user";

const hardCodedUsers = [
    new User({
        id: 1,
        userType: "user",
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
        userType: "user",
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
        // Needs server call
        let admin = new AdminUser();
        let userToReturn;
        if (username === "user" && password === "user") {
            userToReturn = hardCodedUsers[0];
        } else if (username === "user1" && password === "user1") {
            userToReturn = hardCodedUsers[1];
        } else if (username === "admin" && password === "admin") {
            return admin;
        }
        if (admin.getBannedUsers().includes(userToReturn)) {
            throw new Error("USER IS BANNED");
        } else {
            return userToReturn;
        }
    }

    static getUserFromId(userId) {
        return hardCodedUsers.find(user => user.id === userId);
    }
}

export default UserManager;