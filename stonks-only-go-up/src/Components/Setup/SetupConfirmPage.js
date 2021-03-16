// General Imports
import { React } from "react"

// Setup Confirm Page
/*
    This page is the SIXTH step of the setting up account
*/
const SetupConfirmPage = (props) => {
    return (
        <div>
            <h1>Confirm Page</h1>
            <div>
                <button onClick={() => props.history.push('/setup/profile-picture')}>Back</button>
                <button onClick={() => props.history.push('/')}>Finish Setup</button>
            </div>
        </div>
    )
}
export default SetupConfirmPage