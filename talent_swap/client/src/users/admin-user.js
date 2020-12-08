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