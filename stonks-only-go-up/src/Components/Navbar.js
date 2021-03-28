import React, {useState} from "react";
import {ImMenu3} from 'react-icons/im'
import {FaSearchDollar} from 'react-icons/fa'

import '../App.css'

function Navbar(){
    // Need to replace '#' with page links'
    //Stonk Search Bar on Right Side WIP
    const [showLinks, setShowLinks] = useState(false);
    return(
    <div className = "Navbar">
        <div className = "leftSide">
            <div className = "links" id = {showLinks ? "hidden" : "" }>
                <a href = '/dashboard'>Home</a>
                <a href = '/followed-stonks'>Your Stonks</a>
                <a href = '/hype-stonks'>Hype</a>
                <a href = '#'>Settings</a>
                <a href = 'mission'>Mission</a>
                <a href = '/signup'>Sign Up!</a>
            </div>
            <button onClick={()=>setShowLinks(!showLinks)}> <ImMenu3 /> </button>
        </div>
        <div className = "rightSide">
            <input type = "text" placeholder = "Search Stonks..."/>
            <button><FaSearchDollar /></button>
        </div>
    </div>

    )
}
export default Navbar