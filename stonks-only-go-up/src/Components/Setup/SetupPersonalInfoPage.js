// General Imports
import { React } from "react"

// Setup Personal Info Page
/*
    This page is the SECOND step of the setting up personal info.
*/
const SetupPersonalInfoPage = (props) => {
    return (
        <div>
            <h1>Personal Info Page</h1>
            <div>
                <button onClick={() => props.history.push('/setup/initial')}>Back</button>
                <button onClick={() => props.history.push('/setup/interest-suggest')}>Continue</button>
            </div>
        </div>
    )
}
export default SetupPersonalInfoPage