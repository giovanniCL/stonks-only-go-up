// General Imports
import { React, useState } from "react"

// Setup Personal Info Page
/*
    This page is the SECOND step of the setting up personal info.
*/
const SetupPersonalInfoPage = (props) => {
    const [inputPersonalForm, setPersonalForm] = useState({
        personalName: "",
        birthday: "",
        gender: "",
        location: "",
        educationLevel: "",
    })

    function handleInputChange(e) {
        let inputPersonalFormWorking = {...inputPersonalForm}
        inputPersonalFormWorking[e.target.name] = e.target.value
        setPersonalForm(inputPersonalFormWorking)
    }

    return (
        <div className="setup-page-wrapper">
            <h1 className="setup-header">Personal Info Page</h1>
            <p>Please input your personal information:</p>
            <div className="setup-personal-info-inputs">
                <input
                    name="personalName"
                    value={inputPersonalForm.personalName}
                    onChange={handleInputChange}
                    placeholder="Personal Name"
                    type="text"
                />
                <input
                    name="birthday"
                    value={inputPersonalForm.birthday}
                    onChange={handleInputChange}
                    placeholder="Birthday"
                    type="text"
                />
                <input
                    name="gender"
                    value={inputPersonalForm.gender}
                    onChange={handleInputChange}
                    placeholder="Gender"
                    type="text"
                />
                <input
                    name="location"
                    value={inputPersonalForm.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    type="text"
                />
                <input
                    name="educationLevel"
                    value={inputPersonalForm.educationLevel}
                    onChange={handleInputChange}
                    placeholder="Education Level"
                    type="text"
                />
            </div>
            <div className="setup-directory">
                <button className="generic-path-button" onClick={() => props.history.push('/setup/initial')}>Back</button>
                <button className="generic-path-button" onClick={() => props.history.push('/setup/interest-suggest')}>Continue</button>
            </div>
        </div>
    )
}
export default SetupPersonalInfoPage