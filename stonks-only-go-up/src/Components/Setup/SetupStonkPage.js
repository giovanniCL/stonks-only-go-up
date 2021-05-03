// General Imports
import { React, useEffect, useState } from "react"
import axios from 'axios'
import { ageList } from "../Lists/AgeList"
import { recommendedList } from "../Lists/RecommendedList"

// Setup Stonk Page
/*
    This page is the FOURTH step of the setting up account
*/
const SetupStonkPage = (props) => {

    let [stonkFullList, setStonkFullList] = useState([])

    let [stonksSelected, setStonkSelected] = useState(() => {
        // Note. for this is will always be different because of the api call we make,
        // but once we finalize the stonk calls, it will be saved
        if (props.setupForm.stonks.length === 0) {
            return []
        } else {
            return props.setupForm.stonks
        }
    })

    function stonkClicked(eachInterest) {
        let interestsSelectedWorking = [...stonksSelected]
        let interestIndex = interestsSelectedWorking.indexOf(eachInterest)
        if (interestIndex === -1) {
            setStonkSelected([...interestsSelectedWorking, eachInterest])
        } else {
            interestsSelectedWorking.splice(interestIndex, 1)
            setStonkSelected(interestsSelectedWorking)
        }
    }

    function getNewStonks(parentArray) {
        return [].concat.apply([], [...parentArray].map(o => o.newStonk))
    }
    function getOldStonks(parentArray) {
        return [].concat.apply([], [...parentArray].map(o => o.oldStonk))
    }

    const [notSuggestedStonks, setNotSuggestedStonks] = useState([])

    useEffect(() => {

        const userAge = props.setupForm.personalInfo.age
        const ageIndex = ageList.findIndex(o => o === userAge)
        let stonkSuggests = []

        if (ageIndex >= 2) {
            stonkSuggests = getOldStonks(props.deepInterestList)
        } else if (ageIndex < 2) {
            stonkSuggests = getNewStonks(props.deepInterestList)
        } else {
            stonkSuggests = getNewStonks(props.deepInterestList).concat(getOldStonks(props.deepInterestList))
        }
        if (stonkSuggests.length === 0) {
            stonkSuggests = getNewStonks(recommendedList).concat(getOldStonks(recommendedList))
        }

        const notSuggestedLocal = recommendedList.filter(x => !props.deepInterestList.includes(x))
        setNotSuggestedStonks(getNewStonks(notSuggestedLocal).concat(getOldStonks(notSuggestedLocal)))

        setStonkFullList(stonkSuggests)
    }, [props.deepInterestList, props.setupForm])

    return (
        <div>
            <h1 className="setup-header">Stonk Page</h1>
            <p className="setup-description">Please select the following stonks you wish to start following:</p>


            <div>
                <h3>Suggested Stonks</h3>
                <ul className="stonk-list">
                    {stonkFullList.map((eachStonk, eachInterestIndex) => {
                        return (
                            <li className="each-stonk-item" key={eachInterestIndex}>
                                <button
                                    className={stonksSelected.includes(eachStonk) ?
                                        "stonk-bttn stonk-selected" :
                                        "stonk-bttn stonk-not-selected"
                                    }
                                    onClick={() => stonkClicked(eachStonk)}>
                                    {eachStonk.label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h3>Other Stonks</h3>
                <ul className="stonk-list">
                    {notSuggestedStonks.map((eachStonk, eachInterestIndex) => {
                        return (
                            <li className="each-stonk-item" key={eachInterestIndex}>
                                <button
                                    className={stonksSelected.includes(eachStonk) ?
                                        "stonk-bttn stonk-selected" :
                                        "stonk-bttn stonk-not-selected"
                                    }
                                    onClick={() => stonkClicked(eachStonk)}>
                                    {eachStonk.label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>


            <div className="setup-directory">
                <button
                    className="back-setup-path-button"
                    onClick={() => {
                        props.handleMainFormChange("stonks", stonksSelected)
                        props.history.push('/setup/interest-suggest')
                    }}
                >
                    Back
                </button>
                <button
                    className="go-setup-path-button"
                    onClick={() => {
                        props.handleMainFormChange("stonks", stonksSelected)
                        props.history.push('/setup/profile-picture')
                    }}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}
export default SetupStonkPage