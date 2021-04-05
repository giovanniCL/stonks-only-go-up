// General Imports
import { React } from "react"
import "../Reset/reset.css"


// Log In Page
/*
    Page is the first step of the process in logging into account. This will appear
    right after the user clicks the log in button (username, password)
*/
// <button onClick={() => props.history.push('/setup/personal-info')}>Begin Account Setup</button>
const ResetPage = (props) => {
    return (
        <div className = "loginBody">
        <div className = "loginBox">
            <div className = "loginH">Reset Password</div>

            <input type="password" name="password" placeholder="New Password" required></input>
            <input type="password" name="password" placeholder="Confirm Password" required></input>
            <button type="submit" value="Reset Password">Reset Password</button>
            <button onClick={() => props.history.push('/login/initial')}>Return to login</button>
            
            
        </div>
        </div>
    )
}
export default ResetPage