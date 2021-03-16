// General Imports
import { React } from "react"

// Setup Confirm Page
/*
    This page is the SIXTH step of the setting up account
*/
const SetupConfirmPage = (props) => {
    return (
        <div className="setup-page-wrapper">
            <h1 className="setup-header">Confirm Page</h1>
            <div className="setup-directory">
                <button className="generic-path-button" onClick={() => props.history.push('/setup/profile-picture')}>Back</button>
                <button className="generic-path-button" onClick={() => props.history.push('/')}>Finish Setup</button>
            </div>
        </div>
    )
}
export default SetupConfirmPage