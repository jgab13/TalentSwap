import User from "./user";
import AdminUser from "./admin-user";
import pic0 from "./profile.jpg";
import pic1 from "./profile1.jpg";

export const hardCodedUsers = [
    new User({
        id: 1,
        userType: "user",
        name: "User One",
        credits: 0,
        bio: "Empty Bio",
        expertise: "JavaScript",
        development: "writing film reviews",
        coursesTeaching: [1, 2, 4],
        coursesLearning: [0, 3],
        pic: pic0
    }),
    new User({
        id: 2,
        userType: "user",
        name: "User Two",
        credits: 0,
        bio: "Empty Bio",
        expertise: "Cognitive Science",
        development: "yoga",
        coursesTeaching: [2],
        coursesLearning: [1],
        pic: pic1
    })
]

class UserManager {
    static login(username, password) {
        // Needs server call
        let admin = new AdminUser();
        let userToReturn;
        if (username === "user" && password === "user") {
            userToReturn = hardCodedUsers[0];
        } else if (username === "user2" && password === "user2") {
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
        // Needs server call
        return hardCodedUsers.find(user => user.id === userId);
    }
}

export default UserManager;