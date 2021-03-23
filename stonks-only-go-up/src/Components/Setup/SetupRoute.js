//General Imports
import React, { useState } from "react";
import { Route } from "react-router-dom";
import LordAndSaviorDefaultPicture from "../../Assets/LordAndSaviorProfile.png"

// Route Wrapper for Setup Process
const SetupRoute = ({ component: RouteComponent, ...rest }) => {

    const [setupForm, changeSetupForm] = useState({
        personalInfo: {},
        interests: [],
        stonks: [],
        profilePicture: LordAndSaviorDefaultPicture,
    })

    function handleMainFormChange(key, value) {
        console.log(key, value)
        const setupFormWorking = {...setupForm}
        setupFormWorking[key] = value
        changeSetupForm(setupFormWorking)
    }

    return (
        <Route
            {...rest}
            render={routeProps =>
                <RouteComponent
                    {...routeProps}
                    setupForm={setupForm}
                    handleMainFormChange={handleMainFormChange}
                />
            }
        />
    )
}

export default SetupRoute
