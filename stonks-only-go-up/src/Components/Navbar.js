import React, { useState, useContext } from "react";
import { ImMenu3 } from 'react-icons/im'
import { FaSearchDollar } from 'react-icons/fa'
import Select from 'react-select';
import { Dropdown } from 'react-bootstrap'
import { Authentication } from "../AuthContext";
import { Link } from 'react-router-dom';

import '../App.css'

function Navbar(props) {

    const { authData, setAuthData } = useContext(Authentication);

    console.log(authData)
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
                {!authData.loggedIn ? (
                    <div className="nonloggedLinks">
                        <Link className="navLink" to="/login">Login</Link>
                        <Link className="navLink" to="/signup">Sign Up</Link>
                    </div>
                ) : (

                    <Dropdown>
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic">
                            Me
                    </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link className="navLink" to="/mission">
                                <Dropdown.Item href="/mission">Mission</Dropdown.Item>
                            </Link>
                            <Link className="navLink" to="/settings">
                                <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                            </Link>
                            <Dropdown.Item>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )
                }

            </div >
        </div >

    )
}
export default Navbar