import User from "./user";
import AdminUser from "./admin-user";

class UserManager {
    static async login(username, password) {
        // Login with session, but send back hardcoded frontend data for now
        const request = new Request("/users/login", {
            method: "POST",
            body: JSON.stringify({username: username, password: password}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                const json = await res.json();
                switch(json.userType) {
                    case "admin":
                        return new AdminUser(json);
                    case "user":
                        return new User(json);
                    default:
                        return new User(json);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async logout() {
        const request = new Request("/users/logout", {
            method: "GET"
        });
        try {
            await fetch(request);
        } catch (error) {
            console.log(error);
        }
    }

    static async register(username, password) {
        const request = new Request("/api/users", {
            method: "POST",
            body: JSON.stringify({username: username, password: password}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                return new User(await res.json())
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async getUserFromUsername(username) {
        const request = new Request(`/api/users/${username}`, {
            method: "GET"
        });
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                const json = await res.json();
                switch(json.userType) {
                    case "admin":
                        return new AdminUser(json);
                    case "user":
                        return new User(json);
                    default:
                        return new User(json);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllUsers() {
        const request = new Request("/api/users", {
            method: "GET"
        });
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                const json = await res.json();
                return json.map(user => {
                    switch(user.userType) {
                        case "admin":
                            return new AdminUser(user);
                        case "user":
                            return new User(user);
                        default:
                            return new User(user);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserManager;