import React, { useState, useContext } from "react";
import { ImMenu3 } from 'react-icons/im'
import { Settings, Moon } from "react-feather"
import Select from 'react-select';
import { Dropdown } from 'react-bootstrap'
import { Authentication } from "../AuthContext";
import LordAndSaviorDefaultPicture from "../Assets/LordAndSaviorProfile.png"
import { Link } from 'react-router-dom';
import { Search } from 'react-feather'

const AuthNavbar = (props) => {
    if (!props.authData.token) {
        return (
            <div className="nonloggedLinks">
                <Link className="navLink" to="/login">Login</Link>
                <Link className="navLink" to="/signup">Sign Up</Link>
            </div>)
    } else {
        return (
            <Dropdown id="dp-nav-main-wrapper">
                <Dropdown.Toggle
                    variant="success"
                    id="dropdown-toggle"
                >
                    <img id="dropdown-nav-profile-picture"
                        src={LordAndSaviorDefaultPicture}
                        alt=""
                    />
                </Dropdown.Toggle >

                <Dropdown.Menu align="right">
                    <h1 id="dropdown-menu-header">SOGU</h1>
                    <Link to="/mission">
                        <Dropdown.Item href="/mission" className="dropdown-item-nav">
                            <Moon size={20} /><p>Mission</p>
                        </Dropdown.Item>
                    </Link>
                    <Link to="/settings">
                        <Dropdown.Item href="/settings" className="dropdown-item-nav">
                            <Settings size={20} /><p>Settings</p>
                        </Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item id="logout-menu-bttn" onClick={() => props.authLogout()}>Log Out</Dropdown.Item>
                    <Dropdown.Divider />

                </Dropdown.Menu>
            </Dropdown >
        )
    }
}

const SearchStonk = (props) => {
    return (
        <form id="stonk-search-wrapper">
            <input
                id="search-input"
                placeholder="Search a Stonk Symbol..."
                value={props.stonkSearch}
                onChange={(e) => props.setStonkSearch(e.target.value)}
            />
            <Link to={`/single-stonk/${props.stonkSearch}`} query={{ name: props.stonkSearch }}>
                <button className="go-search-stonk" onClick={() => props.setShowLinks(false)}><Search size={16} /></button>
            </Link>
        </form>
    )
}

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
                <div id="special-auth">
                    <AuthNavbar authData={authData} authLogout={authLogout} />
                </div>
                <button id="show-burger" onClick={() => setShowLinks(!showLinks)}> <ImMenu3 size={32} /> </button>

            </div>
            {showLinks && (
                <div id="drop-bottom">
                    <div id="drop-special">
                        <SearchStonk stonkSearch={stonkSearch} setStonkSearch={setStonkSearch} setShowLinks={setShowLinks} />

                    </div>

                    <div id="new-links-dropdown">
                        <Link className="navLink" to="/dashboard">Home</Link>
                        <Link className="navLink" to="/followed-stonks">Your Stonks</Link>
                        <Link className="navLink" to="/hype-stonks">Hype Stonks</Link>
                    </div>


                </div>
            )}
            <div className="center-side">
                <div className="links" id={showLinks ? "hidden" : ""}>
                    <Link className="navLink" to="/dashboard">Home</Link>
                    <Link className="navLink" to="/followed-stonks">Your Stonks</Link>
                    <Link className="navLink" to="/hype-stonks">Hype Stonks</Link>
                </div>

            </div>
            <div className="right-side">
                <SearchStonk stonkSearch={stonkSearch} setStonkSearch={setStonkSearch} setShowLinks={setShowLinks} />
                <AuthNavbar authData={authData} authLogout={authLogout} />
            </div>
        </div>

    )
}
export default Navbar