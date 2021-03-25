// General Imports
import { React, useEffect, useState } from "react"
import axios from 'axios'

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

    useEffect(() => {
        async function getStonkData() {
            let stonkData = await axios.get("https://my.api.mockaroo.com/stonk-list.json?key=1031c360")
            setStonkFullList(stonkData.data)
        }
        getStonkData()
    }, [])

    return (
        <div>
            <h1 className="setup-header">Stonk Page</h1>
            <p>Please select the following stonks you wish to start following:</p>
            {stonkFullList.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul className="stonk-list">
                    {stonkFullList.map((eachStonk, eachInterestIndex) => {
                        return (
                            <li className="each-stonk-item" key={eachInterestIndex}>
                                <button
                                    className={stonksSelected.includes(eachStonk) ?
                                        "stonk-bttn stonk-selected" :
                                        "stonk-bttn"
                                    }
                                    onClick={() => stonkClicked(eachStonk)}>
                                    {eachStonk.stonk}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
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