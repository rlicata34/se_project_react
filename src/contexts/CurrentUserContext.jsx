import React from "react";

export const CurrentUserContext = React.createContext({
    name: "",
    email: "",
    avatar: "",
    clearCurrentUser: () => {},
    updateCurrentUser: () => {},
 }); 
