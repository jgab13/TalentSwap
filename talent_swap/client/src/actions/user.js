// Functions to help with user actions.
import User from "./../users/user"
// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = "/users/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

export const CheckUsername = (userInput) => {
    const url = "api/users/get/"+userInput.username

    return fetch(url)
         .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const Register = (userInput) => {

    const request = new Request("api/users", {
        method: "post",
        body: JSON.stringify({
            username: userInput.username,
            password: userInput.password1
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });


    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                console.log(json.currentUser);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/users/logout";

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            console.log(error);
        });
};
