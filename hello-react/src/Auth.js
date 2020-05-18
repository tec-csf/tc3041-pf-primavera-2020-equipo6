import React, {useEffect, useState} from 'react';
import app from "./base";

// Tool that allows you to propagate some data through all component tree.
export const AuthContext = React.createContext();

//Provider component, which will store our Authentication status.
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
            >

                {children}
        </AuthContext.Provider>
    );
};