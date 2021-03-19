// General Imports
import { React, useState } from "react"
import LordAndSaviorDefaultPicture from "../../Assets/LordAndSaviorProfile.png"
// Setup Profile Picture Page
/*
    This page is the FIFTH step of the setting up account
*/
const SetupProfilePicturePage = (props) => {
    const [currentProfilePicture, setProfilePicture] = useState(() => {
        if (!!props.setupForm.profilePicture) {
            return props.setupForm.profilePicture
        } else {
            return LordAndSaviorDefaultPicture
        }
    })

    function onPictureChange(e) {
        setProfilePicture(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <div className="setup-page-wrapper">
            <h1 className="setup-header">Profile Picture Page</h1>
            <p>Please upload a profile picture: </p>
            <div id="file-profile-picture-wrapper">
                <img
                    className="profile-picture-setup"
                    src={currentProfilePicture}
                    alt="no-profile"
                />
                <input
                    className="profile-picture-upload-input"
                    type="file"
                    onChange={onPictureChange}
                    accept="image/*"
                />
            </div>
            <div className="setup-directory">
                <button
                    className="generic-path-button"
                    onClick={() => {
                        props.handleMainFormChange("profilePicture", currentProfilePicture)
                        props.history.push('/setup/stonk-suggest')
                    }
                    }>Back</button>
                <button
                    className="generic-path-button"
                    onClick={() => {
                        props.handleMainFormChange("profilePicture", currentProfilePicture)
                        props.history.push('/setup/confirm')
                    }}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}
export default SetupProfilePicturePage