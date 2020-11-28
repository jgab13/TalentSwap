import React from "react";
import User from "./../users/user";
export const UserContext = React.createContext(
    {
        currentUser: new User(),
        changeUser: () => {}
    }
);