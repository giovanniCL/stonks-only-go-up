import React, { useEffect, useState, useContext } from 'react'

const MustBeSignedAction = (props) => {
    return (
        <div id="must-signed-action">
            <div className="top-must-signed">
                <h2>You Must Be Signed In To View This Action</h2>
                <p>You unfortunately must be signed in to view this page. Please either login or signup to continue.</p>
            </div>
            <div className="bottom-must-signed">
                <div id="fake-graph"></div>
                <div id="wrapper-fake">
                    <div id="fake-info-1"></div>
                    <div id="fake-info-2"></div>
                </div>
                <div id="fake-info-3"></div>
            </div>

        </div>
    )
}
export default MustBeSignedAction