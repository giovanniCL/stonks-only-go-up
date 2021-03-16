// General Imports
import { React } from "react"

// Setup Stonk Page
/*
    This page is the FOURTH step of the setting up account
*/
const SetupStonkPage = (props) => {
    return (
        <div>
            <h1>Stonk Page</h1>
            <div>
                <button onClick={() => props.history.push('/setup/interest-suggest')}>Back</button>
                <button onClick={() => props.history.push('/setup/profile-picture')}>Continue</button>
            </div>
        </div>
    )
}
export default SetupStonkPage