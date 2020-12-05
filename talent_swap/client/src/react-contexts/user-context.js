import React from "react";
export const UserContext = React.createContext(
    {
        currentUser: undefined,
        changeUser: () => {},
        login: async (username, password) => {},
        logout: async () => {}
    }
);