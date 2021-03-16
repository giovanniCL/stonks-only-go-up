import React from "react";

import '../App.css'

function Navbar(){
    // Need to replace '#' with page links'
    //Stonk Search Bar on Right Side WIP
    return(
    <div className = "Navbar">
        <div className = "leftSide">
            <div className = "links">
                <a href = '#'>Home</a>
                <a href = '#'>Hype</a>
                <a href = '#'>Settings</a>
                <a href = '#'>Mission</a>
                <a href = '/setup/initial'>Sign Up!</a>
            </div>
        </div>
        <div className = "rightSide">
            <input type = "text" placeholder = "Search Stonks..."/>
            <button>Search</button>
        </div>
    </div>

    )
}
export default Navbar