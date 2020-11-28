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
        // Needs server call
        const userToBan = UserManager.getUserFromId(userId);
        if (userToBan) {
            bannedUsers.push(userToBan);
        }
    }

    unbanUser = (userId) => {
        // Needs server call
        bannedUsers.splice(
            bannedUsers.indexOf(
                UserManager.getUserFromId(userId)
            ),
            1
        );
    }

    getBannedUsers = () => {
        // Needs server call
        return bannedUsers;
    }
}

export default AdminUser;