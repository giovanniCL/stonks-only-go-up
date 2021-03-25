// General Imports
import { React, useState } from "react"

// Setup Confirm Page
/*
    This page is the SIXTH step of the setting up account
*/

const NotCorrectEdit = (props) => {
    return (
        <button
            className="not-correct-edit-here"
            onClick={() => { props.history.push(props.direction) }}
        >Not correct? Edit here</button>
    )
}
const SetupConfirmPage = (props) => {
    console.log("le props", props)
    console.log(props.setupForm)

    return (
        <div>
            <h1 className="setup-header">Confirm Page</h1>
            <p>Before finishing up your account creation, please confirm the following inputs are correct and accurate:</p>
            <div className="confirm-personal-info">
                <h4>Personal Information</h4>
                <NotCorrectEdit history={props.history} direction="/setup/personal-info" />
                <div className="confirm-personal-single">
                    <h6>Name: </h6><input value={props.setupForm.personalInfo.personalName} disabled={true} />
                </div>
                <div className="confirm-personal-single">
                    <h6>Birthday: </h6><input value={props.setupForm.personalInfo.birthday} disabled={true} />
                </div>
                <div className="confirm-personal-single">
                    <h6>Gender: </h6><input value={props.setupForm.personalInfo.gender} disabled={true} />
                </div>
                <div className="confirm-personal-single">
                    <h6>Location: </h6><input value={props.setupForm.personalInfo.location} disabled={true} />
                </div>
                <div className="confirm-personal-single">
                    <h6>Education Level: </h6><input value={props.setupForm.personalInfo.educationLevel} disabled={true} />
                </div>
            </div>
            <div className="confirm-interests">
                <h4>Interests</h4>
                <NotCorrectEdit history={props.history} direction="/setup/interest-suggest" />
                {props.setupForm.interests.length === 0 ? (
                    <h6 className="no-confirm-input">No Interests Selected</h6>
                ) : (
                    <ul className="interest-list-confirm">
                        {props.setupForm.interests.map((eachInterest, interestIndex) => {
                            return (
                                <li key={interestIndex} className="each-interest-item-confirm">
                                    {eachInterest}
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
            <div className="confirm-stonks">
                <h4>Stonks</h4>
                <NotCorrectEdit history={props.history} direction="/setup/stonk-suggest" />
                {props.setupForm.stonks.length === 0 ? (
                    <h6 className="no-confirm-input">No Stonks Selected</h6>
                ) : (
                    <ul className="stonk-list-confirm">
                        {props.setupForm.stonks.map((eachStonk, stonkIndex) => {
                            return (
                                <li key={stonkIndex} className="each-stonk-item-confirm">
                                    {eachStonk.stonk}
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
            <div className="confirm-profile-picture">
                <h4>Profile Picture</h4>
                <NotCorrectEdit history={props.history} direction="/setup/profile-picture" />
                <img
                    className="profile-picture-setup"
                    src={props.setupForm.profilePicture}
                    alt="no-profile"
                />
            </div>
            <div id="confirm-directory" className="setup-directory">
                <button className="back-setup-path-button" onClick={() => props.history.push('/setup/profile-picture')}>Back</button>
                <button className="go-setup-path-button" onClick={() => props.history.push('/')}>Finish Setup</button>
            </div>
        </div >
    )
}
export default SetupConfirmPage