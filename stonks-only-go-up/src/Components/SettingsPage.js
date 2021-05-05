// General Imports
import { React, useContext, useEffect, useState } from "react"
import axios from "axios"
import { Authentication } from '../AuthContext'
require('dotenv').config()
console.log(process.env.REACT_APP_SERVER)

// Settings Page
/*
    This page is the SIXTH step of the setting up account
*/

const SettingsPage = (props) => {
    const { authData, setAuthData } = useContext(Authentication)

    const [profileDeep, setProfileDeep] = useState({})
    const [profileData, setProfileData] = useState({
        user_name: "",
        first_name: "",
        age: "",
        gender: "",
        last_name: "",
        location: "",
        education_level: "",
    })
    const [securityProfile, setSecurityProfile] = useState({
        email: "",
        password: "",
    })
    const [securityDeep, setSecurityDeep] = useState({})
    useEffect(() => {
        console.log("we out here")
        console.log(authData)
        async function getSettingsInfo() {
            let expressRes = await axios.post(`${process.env.REACT_APP_SERVER}/settings`, { user_name: authData.user_name })
            console.log(expressRes)
            const resParsed = {
                user_name: expressRes.data.user_name,
                first_name: expressRes.data.first_name,
                gender: expressRes.data.gender,
                age: expressRes.data.age,
                last_name: expressRes.data.last_name,
                location: expressRes.data.location,
                education_level: expressRes.data.education_level,
            }
            setProfileData(resParsed)
            setProfileDeep({ ...resParsed })


            const securityParsed = {
                email: expressRes.data.email,
                password: "",
            }
            setSecurityProfile(securityParsed)
            setSecurityDeep({ ...securityParsed })
        }
        getSettingsInfo()

    }, [authData])

    const [errorMessage, setErrorMessage] = useState("")
    async function saveProfileChanges(e) {
        e.preventDefault()
        let errorFlag = false
        Object.keys(profileData).map((eachKey, keyIndex) => {
            if (profileData[eachKey].length === 0) {
                errorFlag = true
            }
        })
        if (errorFlag) {
            setErrorMessage("Your inputs must NOT be empty!")
            return;
        }
        console.log("Should save profile changes")
        saveToDB()
    }


    const [endMessage, setEndMessage] = useState("")
    async function saveToDB() {
        console.log("Saving...")
        try {
            await axios.post(`${process.env.REACT_APP_SERVER}/settings-save`, profileData).then(res => {
                console.log("finisehd!")
                setEndMessage("Successfully saved information!")
                setProfileData({ ...profileData })
                setProfileDeep({ ...profileDeep })
            })

        } catch (error) {
            setErrorMessage("There was a problem uploading your data, maybe try again later?")
        }

    }

    function checkDisabled() {

        return JSON.stringify(profileData) === JSON.stringify(profileDeep)
    }

    function handleInputChange(key, val) {
        const deepCopyProfile = { ...profileData }
        if (errorMessage.length > 0) { setErrorMessage("") }
        deepCopyProfile[key] = val.target.value
        setProfileData(deepCopyProfile)
    }

    const [secondaryErrorMessage] = useState("")
    function handleSecondaryInputChange(key, val) {
        const deepCopyProfile = { ...securityProfile }
        if (errorMessage.length > 0) { setErrorMessage("") }
        deepCopyProfile[key] = val.target.value
        setProfileData(deepCopyProfile)
    }

    return (
        <div id="settings-page-wrapper">
            <h1>Settings & Profile</h1>
            <section id="top-settings">
                <form className="settings-form" onSubmit={saveProfileChanges}>
                    <div className="input-wrapper">
                        <label>First Name</label>
                        <input
                            type="text"
                            value={profileData.first_name}
                            name="first_name"
                            onChange={(value) => handleInputChange("first_name", value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={profileData.last_name}
                            name="last_name"
                            onChange={(value) => handleInputChange("last_name", value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label>Location</label>
                        <input
                            type="text"
                            value={profileData.location}
                            name="location"
                            onChange={(value) => handleInputChange("location", value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label>Education Level</label>
                        <input
                            type="text"
                            value={profileData.education_level}
                            name="education_level"
                            onChange={(value) => handleInputChange("education_level", value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label>Gender</label>
                        <input
                            type="text"
                            value={profileData.gender}
                            name="gender"
                            onChange={(value) => handleInputChange("gender", value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label>Age</label>
                        <input
                            type="text"
                            value={profileData.age}
                            name="age"
                            onChange={(value) => handleInputChange("age", value)}
                        />
                    </div>

                    <div className="error-wrapper">
                        <p className="error-message">{errorMessage}</p>
                        <p className="success-message">{endMessage}</p>
                    </div>

                    <div className="bottom-settings-wrapper">
                        <button
                            disabled={checkDisabled()} type="submit">Save</button>
                    </div>


                </form>
            </section>
            <section id="bottom-settings">
                <form className="settings-form" onSubmit={saveProfileChanges}>
                    <div className="input-wrapper">
                        <label>Email</label>

                        <input
                            type="text"
                            value={securityProfile.email}
                            name="email"
                            onChange={(value) => handleSecondaryInputChange("email", value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label>Password</label>
                        <input
                            type="text"
                            value={securityProfile.password}
                            name="password"
                            onChange={(value) => handleSecondaryInputChange("email", value)}
                        />
                    </div>

                    <div className="error-wrapper">
                        <p className="error-message">{secondaryErrorMessage}</p>
                    </div>

                    <div className="bottom-settings-wrapper">
                        <button
                            disabled={true} type="submit">Save</button>
                    </div>


                </form>

            </section>

        </div>
    )
}
export default SettingsPage