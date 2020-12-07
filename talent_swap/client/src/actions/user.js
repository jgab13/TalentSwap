// Functions to help with user actions.
import User from "./../users/user"
// Send a request to check if a user is logged in through the session cookie
export const checkSession = async (app) => {
    const url = "/users/check-session";

    await fetch(url)
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