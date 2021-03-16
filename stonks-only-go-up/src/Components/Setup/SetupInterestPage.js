// General Imports
import { React } from "react"

// Setup Interest Page
/*
    This page is the THIRD step of the setting up account
*/
const SetupInterestPage = (props) => {
    return (
        <div>
            <h1>Interest Page</h1>
            <div>
                <button onClick={() => props.history.push('/setup/personal-info')}>Back</button>
                <button onClick={() => props.history.push('/setup/stonk-suggest')}>Continue</button>
            </div>
        </div>
    )
}
export default SetupInterestPage