import {React} from "react";
import mission from "./mission.jpg";
import Navbar from "../Navbar"


// Simple Render of the Mission Page
const MissionPage = () => {
    return (
        <div className="mission-page-wrapper">
            <br id="top-break" />
            <div className="top-mission">
                <h1 className="MissionTitle">Our Mission</h1>
                <div className="MissionStatement">
                    <p> We are devoted to a new, emerging trend of viewing stocks in a social light for younglings and seniors alike to reap in the benefits of stonk knowledge.</p>
                    <p>We want to ensure that everyone has equal access to stonk quality information. This is the greatest thing to happen to the stonk market since Powell blessed us with these interest rates.</p>
                </div>
                <p className="Slogan">To The Moon! &#128640;&#128640;&#128640;&#127765;</p>
            </div>
            <div className="team-container">
                <h1 className="TeamTitle">See More from the Team!</h1>
                <ul id="TeamLinks">
                    <li><a target="_blank" href="https://github.com/Partisi" rel="noreferrer">Erol</a></li>
                    <li><a target="_blank" href="https://github.com/rickypaya" rel="noreferrer">Ricky</a></li>
                    <li><a target="_blank" href="https://github.com/giovanniCL" rel="noreferrer">Giovanni</a></li>
                    <li><a target="_blank" href="https://github.com/alanchu394" rel="noreferrer">Alan</a></li>
                    <li><a target="_blank" href="https://github.com/ad4565" rel="noreferrer">Anthony</a></li>
                </ul>
            </div>
        </div>
    )
}
export default MissionPage