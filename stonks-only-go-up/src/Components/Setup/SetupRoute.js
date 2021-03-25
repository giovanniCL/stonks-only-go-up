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
        const setupFormWorking = { ...setupForm }
        setupFormWorking[key] = value
        changeSetupForm(setupFormWorking)
    }

    return (
        <Route
            {...rest}
            render={routeProps =>
                <section className="setup-page-wrapper">
                    <div className="setup-main-above-info">
                        <h1 className="setup-main-name">Stonks Only Go Up</h1>
                    </div>
                    <div className="setup-inner-wrapper">
                        <div id="top-bar-setup" />
                        <RouteComponent
                            {...routeProps}
                            setupForm={setupForm}
                            handleMainFormChange={handleMainFormChange}
                        />
                    </div>
                </section>
            }
        />
    )
}

export default SetupRoute
