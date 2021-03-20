// General Imports
import { React } from "react"
import "../Login/login.css"


// Log In Page
/*
    Page is the first step of the process in logging into account. This will appear
    right after the user clicks the log in button (username, password)
*/
// <button onClick={() => props.history.push('/setup/personal-info')}>Begin Account Setup</button>
const LogInPage = (props) => {
    return (
        <div className = "loginBody">
        <div className = "loginBox">
            <div className = "loginH">Log In</div>

            <input type="text" name="username" placeholder="Username" required></input>
            <input type="password" name="password" placeholder="Password" required></input>
            <input type="submit" value="Login"></input>
            <button>Forget Password</button>
            
            
        </div>
        </div>
    )
}
export default LogInPage