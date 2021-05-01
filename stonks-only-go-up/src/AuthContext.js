import React, { createContext, useState } from 'react';

export const Authentication = createContext(null);

const AuthProvider = ({ children }) => {

    // Main Auth Handling
    const [authData, setAuthLocalData] = useState({
        token: localStorage.getItem('authToken'),
        lastFetched: null,
    })

    console.log(authData)

    // Used for signup and login
    function setAuthData(data) {
        console.log("setting auth data...")
        setAuthLocalData(data)
        localStorage.setItem('authToken', data.token)
    }
    
    // Used for logout
    function authLogout() {
        console.log("Logging user out...")
        localStorage.clear();
        setAuthLocalData({
            token: null,
            lastFetched: null,
        })
    }

    return (
        <Authentication.Provider
            value={{
                authData,
                setAuthData,
                authLogout
            }}>{children}</Authentication.Provider>
    )
}

export default AuthProvider