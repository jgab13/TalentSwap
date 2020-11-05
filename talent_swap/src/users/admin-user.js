import User from "./user";
import UserManager from "./user-manager";

const bannedUsers = [];

class AdminUser {
    constructor(json=null) {
        this.userType = "admin";
        Object.assign(
            this,
            typeof json === "string" ? JSON.parse(json) : json
        );
    }

    banUser = (userId) => {
        const userToBan = UserManager.getUserFromId(userId);
        if (userToBan) {
            bannedUsers.push(userToBan);
        }
    }

    unbanUser = (userId) => {
        bannedUsers.splice(
            bannedUsers.indexOf(
                UserManager.getUserFromId(userId)
            ),
            1
        );
    }

    getBannedUsers = () => {
        return bannedUsers;
    }
}

export default AdminUser;