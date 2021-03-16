// General Imports
import { React } from "react"

// Setup Interest Page
/*
    This page is the THIRD step of the setting up account
*/
const SetupInterestPage = (props) => {
    return (
        <div className="setup-page-wrapper">
            <h1 className="setup-header">Interest Page</h1>
            <div className="setup-directory">
                <button className="generic-path-button" onClick={() => props.history.push('/setup/personal-info')}>Back</button>
                <button className="generic-path-button" onClick={() => props.history.push('/setup/stonk-suggest')}>Continue</button>
            </div>
        </div>
    )
}
export default SetupInterestPage