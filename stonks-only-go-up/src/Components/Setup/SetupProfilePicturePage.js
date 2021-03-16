// General Imports
import { React } from "react"

// Setup Profile Picture Page
/*
    This page is the FIFTH step of the setting up account
*/
const SetupProfilePicturePage = (props) => {
    return (
        <div>
            <h1>Profile Picture Page</h1>
            <div>
                <button onClick={() => props.history.push('/setup/stonk-suggest')}>Back</button>
                <button onClick={() => props.history.push('/setup/confirm')}>Continue</button>
            </div>
        </div>
    )
}
export default SetupProfilePicturePage