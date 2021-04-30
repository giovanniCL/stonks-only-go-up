// General Imports
import React, { useEffect, useContext } from "react"
import "../Login/login.css"
import { Authentication } from "../../AuthContext";

import axios from "axios"


// Log In Page
/*
    Page is the first step of the process in logging into account. This will appear
    right after the user clicks the log in button (username, password)
*/
// <button onClick={() => props.history.push('/setup/personal-info')}>Begin Account Setup</button>
const LogInPage = (props) => {

    const { authData, setAuthData } = useContext(Authentication);
    console.log(authData)

    useEffect(() => {
        console.log("hellp")
        /*
        async function authPost() {
            let expressRes = await axios.post('/api/auth/login',
                {
                    user_name: "Stonk_Guy_420",
                    password: "PASSWORD",
                })
            console.log(expressRes)
            console.log(expressRes.data)
        }
       
        authPost()
         */
        //setAuthData({ dad: "Rawr" })
    }, [])

    async function handleLogin(e) {
        e.preventDefault()
        console.log(e)
    }

    return (
        <div className="loginBody">
            <div className="loginBox">
                <div className="loginH">Log In</div>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required />
                </form>


                <button type="submit" value="Login" onClick={() => props.history.push('/dashboard')}>Log In</button>
                <button onClick={() => props.history.push('/reset/initial')}>Forget Password</button>


            </div>
        </div>
    )
}
export default LogInPage