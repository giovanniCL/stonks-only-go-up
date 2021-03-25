// General Imports
import { React, useState } from "react"
import { checkObjectNoProperties } from "../../FunctionBucket"

// Setup Personal Info Page
/*
    This page is the SECOND step of the setting up personal info.
*/
const SetupPersonalInfoPage = (props) => {

    const [inputPersonalForm, setPersonalForm] = useState(() => {
        if (checkObjectNoProperties(props.setupForm.personalInfo)) {
            return {
                personalName: "",
                birthday: "",
                gender: "",
                location: "",
                educationLevel: "",
            }
        } else {
            return props.setupForm.personalInfo
        }
    })

    function handleInputChange(e) {
        let inputPersonalFormWorking = { ...inputPersonalForm }
        inputPersonalFormWorking[e.target.name] = e.target.value
        setPersonalForm(inputPersonalFormWorking)
    }

    return (
        <div>
            <h1 className="setup-header">Personal Info Page</h1>
            <p className="setup-description">Please input your personal information:</p>
            <div className="setup-personal-info-inputs">
                <input
                    name="personalName"
                    autoComplete="off"
                    value={inputPersonalForm.personalName}
                    onChange={handleInputChange}
                    placeholder="Personal Name"
                    type="text"
                />
                <input
                    name="birthday"
                    autoComplete="off"
                    value={inputPersonalForm.birthday}
                    onChange={handleInputChange}
                    placeholder="Birthday"
                    type="text"
                />
                <input
                    name="gender"
                    autoComplete="off"
                    value={inputPersonalForm.gender}
                    onChange={handleInputChange}
                    placeholder="Gender"
                    type="text"
                />
                <input
                    name="location"
                    autoComplete="off"
                    value={inputPersonalForm.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    type="text"
                />
                <input
                    name="educationLevel"
                    autoComplete="off"
                    value={inputPersonalForm.educationLevel}
                    onChange={handleInputChange}
                    placeholder="Education Level"
                    type="text"
                />
            </div>
            <div className="setup-directory">
                <button
                    className="back-setup-path-button"
                    onClick={() => {
                        props.handleMainFormChange("personalInfo", inputPersonalForm)
                        props.history.push('/setup/initial')
                    }}
                >
                    Back
                </button>
                <button
                    className="go-setup-path-button"
                    onClick={() => {
                        props.handleMainFormChange("personalInfo", inputPersonalForm)
                        props.history.push('/setup/interest-suggest')
                    }}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}
export default SetupPersonalInfoPage