// General Imports
import { React } from "react"

// Setup Initial Page
/*
    Page is the first step of the process in setting up an account. This will appear
    right after the user inputs their information in the signup page (username, password)
*/
const SetupInitialPage = (props) => {
    return (
        <div>
            <h1 className="setup-header">Setup</h1>
            <p>Let's continue setting up your account with some basic information!</p>
            <div className="setup-directory">
                <button className="go-setup-path-button" onClick={() => props.history.push('/setup/personal-info')}>Begin Account Setup</button>
            </div>
        </div>
    )
}
export default SetupInitialPage