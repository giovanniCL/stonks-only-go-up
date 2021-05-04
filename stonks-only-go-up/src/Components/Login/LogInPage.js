// General Imports
import React, { useEffect, useContext, useState } from "react"
import "../Login/login.css"
import { Authentication } from "../../AuthContext";

import axios from "axios"


// Log In Page
/*
    Page is the first step of the process in logging into account. This will appear
    right after the user clicks the log in button (username, password)
*/
const LogInPage = (props) => {

    const { authData, setAuthData } = useContext(Authentication);
    console.log(authData)

    const [loginErrorMessage, setErrorMessage] = useState("")

    async function handleLogin(e) {
        e.preventDefault()

        const usernameInput = e.target.username.value
        const passwordInput = e.target.password.value

        if (usernameInput.length === 0) {
            setErrorMessage("Your username input is empty!")
            return
        }
        if (passwordInput.length === 0) {
            setErrorMessage("Your password input is empty!")
            return
        }
        const loginForm = {
            user_name: usernameInput,
            password: passwordInput
        }
        //
        const authResponse = await authPost(loginForm)
        if (authResponse.success) {
            console.log("We got the user!")
            setAuthData({
                token: authResponse.data.token,
                lastFetched: new Date(),
            })
            props.history.push('/dashboard')
        } else {
            setErrorMessage(authResponse.message)
        }
    }

    async function authPost(loginForm) {
        try {
            let expressRes = await axios.post('/api/auth/login', loginForm)
            console.log(expressRes)
            console.log(expressRes.data)
            if (expressRes.data.success) {
                return { success: true, data: expressRes.data }
            } else {
                return { success: false, message: expressRes.data.message }
            }

        } catch (error) {
            return { success: false, message: "There was a problem connecting you to the server. Maybe try again later?" }
        }
    }

    /*

    Stonk_Guy_420
    PASSWORD
    
    */

    return (
        <div className="loginBody">
            <div className="loginBox">
                <div className="loginH">Log In</div>
                <form  className = "loginForm"onSubmit={handleLogin}>
                    <div className = "loginFormTop">
                    <input
                        className = "loginInputTexts"
                        type="text"
                        name="username"
                        placeholder="Username..."
                        autoComplete="off"
                        onChange={() => setErrorMessage("")}
                    />
                    <input
                        className = "loginInputTexts"
                        type="password"
                        name="password"
                        placeholder="Password..."
                        autoComplete="off"
                        onChange={() => setErrorMessage("")}
                    />
                    <div style={{ 'color': 'red' }}>{loginErrorMessage}</div>
                    <button className = "loginButton" type="submit">Log In</button>
                    </div>
                    <div className = "loginFormBot">
                        
                        <button className = "loginButton2" onClick={() => props.history.push('/reset/initial')}>Forget Password</button>

                        <button className = "loginButton2" onClick={() => props.history.push('/signup')}>
                            New User? Sign Up Here
                        </button>

                    </div>
                    
                </form>


            </div>
        </div>
    )
}
export default LogInPage