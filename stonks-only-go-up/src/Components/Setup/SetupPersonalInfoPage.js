// General Imports
import { React, useState } from "react"
import { checkObjectNoProperties } from "../../FunctionBucket"
import { genderList } from "../Lists/GenderList"
import { educationLevelList } from "../Lists/EducationLevelList"
import { ageList } from "../Lists/AgeList"
import { locationList } from "../Lists/LocationList"
import { reactSelectInputTheme, reactSelectInputStyles } from "../InlineDesignElements"
import Select from 'react-select';

// Setup Personal Info Page
/*
    This page is the SECOND step of the setting up personal info.
*/
const SetupPersonalInfoPage = (props) => {

    const [inputPersonalForm, setPersonalForm] = useState(() => {
        if (checkObjectNoProperties(props.setupForm.personalInfo)) {
            return {
                personalName: "",
                age: "",
                gender: "",
                location: "",
                educationLevel: "",
            }
        } else {
            return props.setupForm.personalInfo
        }
    })
    
    function handleDropdownChange(key, value) {
        let inputPersonalFormWorking = { ...inputPersonalForm }
        inputPersonalFormWorking[key] = value.value
        setPersonalForm(inputPersonalFormWorking)
    }

    return (
        <div>
            <h1 className="setup-header">Personal Info Page</h1>
            <p className="setup-description">Please input your personal information:</p>
            <div className="setup-personal-info-inputs">
                <Select
                    className="react-select-input"
                    theme={reactSelectInputTheme}
                    onChange={(value) => handleDropdownChange("age", value)}
                    value={!!inputPersonalForm.age && { label: inputPersonalForm.age, value: inputPersonalForm.age }}
                    styles={reactSelectInputStyles}
                    placeholder="Age"
                    maxMenuHeight={160}
                    options={ageList.map(ageRange => { return { label: ageRange, value: ageRange } })}
                />
                <Select
                    className="react-select-input"
                    theme={reactSelectInputTheme}
                    onChange={(value) => handleDropdownChange("gender", value)}
                    value={!!inputPersonalForm.gender && { label: inputPersonalForm.gender, value: inputPersonalForm.gender }}
                    styles={reactSelectInputStyles}
                    placeholder="Gender"
                    maxMenuHeight={160}
                    options={genderList.map(gender => { return { label: gender, value: gender } })}
                />
                <Select
                    className="react-select-input"
                    theme={reactSelectInputTheme}
                    onChange={(value) => handleDropdownChange("location", value)}
                    value={!!inputPersonalForm.location && { label: inputPersonalForm.location, value: inputPersonalForm.location }}
                    styles={reactSelectInputStyles}
                    placeholder="Location"
                    maxMenuHeight={160}
                    options={locationList.map(locationVal => { return { label: locationVal, value: locationVal} })}
                />
                <Select
                    className="react-select-input"
                    theme={reactSelectInputTheme}
                    onChange={(value) => handleDropdownChange("educationLevel", value)}
                    value={!!inputPersonalForm.educationLevel && { label: inputPersonalForm.educationLevel, value: inputPersonalForm.educationLevel }}
                    styles={reactSelectInputStyles}
                    placeholder="Education Level"
                    maxMenuHeight={160}
                    options={educationLevelList.map(level => { return { label: level, value: level } })}
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