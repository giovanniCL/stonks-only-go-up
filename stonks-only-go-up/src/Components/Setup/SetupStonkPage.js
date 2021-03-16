// General Imports
import { React } from "react"

// Setup Stonk Page
/*
    This page is the FOURTH step of the setting up account
*/
const SetupStonkPage = (props) => {
    return (
        <div className="setup-page-wrapper">
            <h1 className="setup-header">Stonk Page</h1>
            <div className="setup-directory">
                <button className="generic-path-button" onClick={() => props.history.push('/setup/interest-suggest')}>Back</button>
                <button className="generic-path-button" onClick={() => props.history.push('/setup/profile-picture')}>Continue</button>
            </div>
        </div>
    )
}
export default SetupStonkPage