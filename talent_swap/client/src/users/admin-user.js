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

    banUser = (username) => {
        // Needs server call
        const userToBan = UserManager.getUserFromUsername(username);
        if (userToBan) {
            bannedUsers.push(userToBan);
        }
    }

    unbanUser = (username) => {
        // Needs server call
        bannedUsers.splice(
            bannedUsers.indexOf(
                UserManager.getUserFromUsername(username)
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