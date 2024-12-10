import React from "react";

export const CurrentUserContext = React.createContext({
    currentUser: null,
    updateCurrentUser: () => {},
    clearCurrentUser: () => {},
 }); 
