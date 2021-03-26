// General Imports
import { React } from "react"

import { Coffee } from "react-feather"

// Setup Initial Page
/*
    Page is the first step of the process in setting up an account. This will appear
    right after the user inputs their information in the signup page (username, password)
*/
const SetupInitialPage = (props) => {
    return (
        <div>
            <h1 className="setup-header">Setup</h1>
            <Coffee id="setup-initial-icon" size="112" />
            <p className="setup-description-initial">Before you begin making your stonks go up, we need to learn more about you!</p>
            <p className="setup-description-initial">We do NOT sell your data with 3rd parties and only collect this information for catering a better experience for yourself!</p>
            <p className="setup-description-initial">Please refer to our <a className="link-redirect-setup" href="https://www.privacypolicies.com/blog/privacy-policy-template/#:~:text=A%20Privacy%20Policy%20is%20a,or%20sold%20to%20third%20parties" target="_blank" rel="noreferrer">Terms & Conditions</a> and our <a className="link-redirect-setup" href="https://www.privacypolicies.com/blog/privacy-policy-template/#:~:text=A%20Privacy%20Policy%20is%20a,or%20sold%20to%20third%20parties" target="_blank" rel="noreferrer">Privacy Policy</a> for more information!</p>
            <div className="setup-directory">
                <button className="go-setup-path-button" onClick={() => props.history.push('/setup/personal-info')}>Begin Account Setup</button>
            </div>
        </div>
    )
}
export default SetupInitialPage