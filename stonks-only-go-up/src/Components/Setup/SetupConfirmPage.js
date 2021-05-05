// General Imports
import { React, useContext } from "react"
import { Authentication } from "../../AuthContext";
const axios = require('axios')
// Setup Confirm Page
/*
    This page is the SIXTH step of the setting up account
*/

const NotCorrectEdit = (props) => {
    return (
        <button
            className="not-correct-edit-here"
            onClick={() => { props.history.push(props.direction) }}
        >Edit</button>
    )
}

const SetupConfirmPage = (props) => {
    /*
    console.log("le props", props)
    console.log(props.setupForm)
    */
    const { authData } = useContext(Authentication);
    console.log(authData)
    console.log(props.setupForm)


    async function saveDB(flops) {
        console.log('hello')
        const info = {
            stonks: flops.setupForm.stonks,
            age: flops.setupForm.personalInfo.age,
            gender: flops.setupForm.personalInfo.gender,
            location: flops.setupForm.personalInfo.location,
            education_level: flops.setupForm.personalInfo.educationLevel,
            user_name: authData.user_name
        }
        try {

            await axios.post('/setup/confirm', info)
        } catch (error) { console.log(error) }
        props.history.push('/')

    }
    return (
        <div className="setup-inner-scroll-confirm">
            <h1 className="setup-header">Confirm Page</h1>
            <p>Before finishing up your account creation, please confirm the following inputs are correct and accurate:</p>
            <div className="confirm-input-divider" />
            <div className="confirm-personal-info">
                <h4 className="confirm-info-title">Personal Info</h4>
                <NotCorrectEdit history={props.history} direction="/setup/personal-info" />
                <div className="confirm-personal-single">
                    <h6>Name: </h6><input value={props.setupForm.personalInfo.personalName} disabled={true} />
                </div>
                <div className="confirm-personal-single">
                    <h6>Age: </h6><input value={props.setupForm.personalInfo.age} disabled={true} />
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
            <div className="confirm-input-divider" />
            <div className="confirm-interests">
                <h4 className="confirm-info-title">Interests</h4>
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
            <div className="confirm-input-divider" />
            <div className="confirm-stonks">
                <h4 className="confirm-info-title">Stonks</h4>
                <NotCorrectEdit history={props.history} direction="/setup/stonk-suggest" />
                {props.setupForm.stonks.length === 0 ? (
                    <h6 className="no-confirm-input">No Stonks Selected</h6>
                ) : (
                    <ul className="stonk-list-confirm">
                        {props.setupForm.stonks.map((eachStonk, stonkIndex) => {
                            return (
                                <li key={stonkIndex} className="each-stonk-item-confirm">
                                    {eachStonk.label}
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
            <div className="confirm-input-divider" />
            <div className="confirm-profile-picture">
                <h4 className="confirm-info-title">Profile Picture</h4>
                <NotCorrectEdit history={props.history} direction="/setup/profile-picture" />
                <img
                    className="profile-picture-setup"
                    src={props.setupForm.profilePicture}
                    alt="no-profile"
                />
            </div>

            <div id="confirm-directory" className="setup-directory">
                <button className="back-setup-path-button" onClick={() => props.history.push('/setup/profile-picture')}>Back</button>
                <button className="go-setup-path-button" onClick={() => { saveDB(props) }}>Finish Setup</button>
            </div>
        </div >
    )
}
export default SetupConfirmPage
