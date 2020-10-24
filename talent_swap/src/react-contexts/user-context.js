import React from "react";
import User from "./../users/user";
export const UserContext = React.createContext(new User({name: "TEST USER"}));