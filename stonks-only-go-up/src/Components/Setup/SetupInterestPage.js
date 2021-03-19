// General Imports
import { React, useState } from "react"
import { interestsList } from "../InterestsList"
// Setup Interest Page
/*
    This page is the THIRD step of the setting up account
*/
const SetupInterestPage = (props) => {

    const [interestsSelected, selectInterest] = useState(() => {
        if (props.setupForm.interests.length === 0) {
            return []
        } else {
            return props.setupForm.interests
        }
    })

    function interestClicked(eachInterest) {
        let interestsSelectedWorking = [...interestsSelected]
        let interestIndex = interestsSelectedWorking.indexOf(eachInterest)
        if (interestIndex === -1) {
            selectInterest([...interestsSelectedWorking, eachInterest])
        } else {
            interestsSelectedWorking.splice(interestIndex, 1)
            selectInterest(interestsSelectedWorking)
        }
    }
    return (
        <div className="setup-page-wrapper">
            <h1 className="setup-header">Interest Page</h1>
            <p>Select the following interests that you enjoy the most:</p>
            <ul className="interest-list">
                {interestsList.map((eachInterest, eachInterestIndex) => {
                    return (
                        <li className="each-interest-item" key={eachInterestIndex}>
                            <button
                                className={interestsSelected.includes(eachInterest) ?
                                    "interest-bttn interest-selected" :
                                    "interest-bttn"
                                }
                                onClick={() => interestClicked(eachInterest)}>
                                {eachInterest}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="setup-directory">
                <button
                    className="generic-path-button"
                    onClick={() => {
                        props.handleMainFormChange("interests", interestsSelected)
                        props.history.push('/setup/personal-info')
                    }}
                >
                    Back
                </button>
                <button
                    className="generic-path-button"
                    onClick={() => {
                        props.handleMainFormChange("interests", interestsSelected)
                        props.history.push('/setup/stonk-suggest')
                    }}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}
export default SetupInterestPage