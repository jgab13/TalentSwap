import UserManager from "./user-manager";
import User from "./user";

class AdminUser extends User {
    constructor(json=null) {
        super(json);
        this.userType = "admin";
    }

    banUser = async (username) => {
        const request = new Request("/api/banned", {
            method: "POST",
            body: JSON.stringify({username: username}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                return res.json();
            }
        } catch (error) {
            console.log(error);
        }
    }

    unbanUser = async (username) => {
        const request = new Request("/api/banned", {
            method: "DELETE",
            body: JSON.stringify({username: username}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                return res.json();
            }
        } catch (error) {
            console.log(error);
        }
    }

    getBannedUsers = async () => {
        const request = new Request("/api/banned", {
            method: "GET"
        });
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                const json = await res.json();
                return await Promise.all(
                    json.map(async ban => await UserManager.getUserFromUsername(ban.bannedUsername))
                );
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default AdminUser;