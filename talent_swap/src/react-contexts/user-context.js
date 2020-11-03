import React from "react";
import User from "./../users/user";
import UserManager from "./../users/user-manager"
export const UserContext = React.createContext(
    {
        currentUser: new User(),
        changeUser: () => {}
    }
);