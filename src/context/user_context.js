import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
    const [myUser, setMyUser] = useState(null);

    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0();

    // setting myUser when logged in/out
    useEffect(() => {
        if (isAuthenticated) {
            setMyUser(user);
        } else {
            setMyUser(null);
        }
    }, [isAuthenticated]);

    return (
        <UserContext.Provider
            value={{
                isLoading,
                isAuthenticated,
                error,
                user,
                loginWithRedirect,
                logout,
                myUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
// make sure use
export const useUserContext = () => {
    return useContext(UserContext);
};
