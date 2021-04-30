import React, { useState, useContext } from "react";
import { ImMenu3 } from 'react-icons/im'
import { Settings, Moon } from "react-feather"
import Select from 'react-select';
import { Dropdown } from 'react-bootstrap'
import { Authentication } from "../AuthContext";
import LordAndSaviorDefaultPicture from "../Assets/LordAndSaviorProfile.png"
import { Link } from 'react-router-dom';

import '../App.css'

function Navbar(props) {

    const { authData, authLogout } = useContext(Authentication);

    // Need to replace '#' with page links'
    //Stonk Search Bar on Right Side WIP
    const [showLinks, setShowLinks] = useState(false);
    return (
        <div className="Navbar">
            <div className="leftSide">
                <h1>SOGU</h1>

            </div>
            <div className="centerSide">
                <div className="links" id={showLinks ? "hidden" : ""}>
                    <Link className="navLink" to="/dashboard">Home</Link>
                    <Link className="navLink" to="/followed-stonks">Your Stonks</Link>
                    <Link className="navLink" to="/hype-stonks">Hype Stonks</Link>
                </div>
            </div>
            <div className="rightSide">
                {!authData.token ? (
                    <div className="nonloggedLinks">
                        <Link className="navLink" to="/login">Login</Link>
                        <Link className="navLink" to="/signup">Sign Up</Link>
                    </div>
                ) : (

                    <Dropdown>
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-nav-main-wrapper"
                            >
                            <img id="dropdown-nav-profile-picture"
                                src={LordAndSaviorDefaultPicture}
                                alt=""
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="right">
                            <h1 id="dropdown-menu-header">SOGU</h1>
                            <Link className="navLink" to="/mission">
                                <Dropdown.Item href="/mission" className="dropdown-item-nav">
                                    <Moon size={20} /><p>Mission</p>
                                </Dropdown.Item>
                            </Link>
                            <Link className="navLink" to="/settings">
                                <Dropdown.Item href="/settings" className="dropdown-item-nav">
                                    <Settings  size={20}/><p>Settings</p>
                                </Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item id="logout-menu-bttn" onClick={() => authLogout()}>Log Out</Dropdown.Item>
                            <Dropdown.Divider />
                            <div id="bottom-dropdown-profile-wrapper">
                                <Link className="dropDownNavLink" to="/privacy-policy">
                                    Privacy Policy
                                </Link>
                                <Link className="dropDownNavLink" to="/terms-and-conditions">
                                    Terms & Condition
                                </Link>

                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </div>
        </div>

    )
}
export default Navbar