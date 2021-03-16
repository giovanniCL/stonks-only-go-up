// General Imports
import { React } from "react"

// Setup Profile Picture Page
/*
    This page is the FIFTH step of the setting up account
*/
const SetupProfilePicturePage = (props) => {
    return (
        <div className="setup-page-wrapper">
            <h1 className="setup-header">Profile Picture Page</h1>
            <div className="setup-directory">
                <button className="generic-path-button" onClick={() => props.history.push('/setup/stonk-suggest')}>Back</button>
                <button className="generic-path-button" onClick={() => props.history.push('/setup/confirm')}>Continue</button>
            </div>
        </div>
    )
}
export default SetupProfilePicturePage