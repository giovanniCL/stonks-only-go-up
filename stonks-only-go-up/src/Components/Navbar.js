import React, { useState, useContext } from "react";
import { ImMenu3 } from 'react-icons/im'
import { Settings, Moon } from "react-feather"
import Select from 'react-select';
import { Dropdown } from 'react-bootstrap'
import { Authentication } from "../AuthContext";
import LordAndSaviorDefaultPicture from "../Assets/LordAndSaviorProfile.png"
import { Link } from 'react-router-dom';
import { Search } from 'react-feather'


function Navbar(props) {

    const { authData, authLogout } = useContext(Authentication);

    const [stonkSearch, setStonkSearch] = useState("")
    // Need to replace '#' with page links'
    //Stonk Search Bar on Right Side WIP
    const [showLinks, setShowLinks] = useState(false);
    return (
        <div className="nav-bar-wrapper">
            <div className="left-side">
                <h1>SOGU</h1>

            </div>
            <div className="center-side">
                <div className="links" id={showLinks ? "hidden" : ""}>
                    <Link className="navLink" to="/dashboard">Home</Link>
                    <Link className="navLink" to="/followed-stonks">Your Stonks</Link>
                    <Link className="navLink" to="/hype-stonks">Hype Stonks</Link>
                </div>
            </div>
            <div className="right-side">
                <form id="stonk-search-wrapper">
                    <input
                        id="search-input"
                        placeholder="Search a Stonk Symbol..."
                        value={stonkSearch}
                        onChange={(e) => setStonkSearch(e.target.value)}
                    />
                    <Link to={`/single-stonk/${stonkSearch}`} query={{ name: stonkSearch }}>
                        <button className="go-search-stonk"><Search size={16} /></button>
                    </Link>
                </form>
                {!authData.token ? (
                    <div className="nonloggedLinks">
                        <Link className="navLink" to="/login">Login</Link>
                        <Link className="navLink" to="/signup">Sign Up</Link>
                    </div>
                ) : (

                    <Dropdown id="dropdown-nav-main-wrapper">
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-toggle"
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
                                    <Settings size={20} /><p>Settings</p>
                                </Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item id="logout-menu-bttn" onClick={() => authLogout()}>Log Out</Dropdown.Item>
                            <Dropdown.Divider />

                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </div>
        </div>

    )
}
export default Navbar