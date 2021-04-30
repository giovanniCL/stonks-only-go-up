import React, { createContext, useState } from 'react';

export const Authentication = createContext(null);

const AuthProvider = ({ children }) => {

    const [authData, setAuthData] = useState({
        loggedIn: false,
        token: null,
        lastFetched: null,
    })

    return (
        <Authentication.Provider
            value={{
                authData,
                setAuthData
            }}>{children}</Authentication.Provider>
    )
}

export default AuthProvider