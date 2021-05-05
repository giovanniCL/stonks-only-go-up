import Navbar from '../Navbar'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import StonkPreview from '../Stonks/StonkPreview'
import StonksHeader from '../Stonks/StonksHeader'
import './Dashboard.css'
import { Authentication } from "../../AuthContext";

import Diamond from "../../Assets/diamond.jpg"

import Announcements from "./Announcements"

const Dashboard = (props) => {

    const { authData, setAuthData } = useContext(Authentication);
    console.log(authData)
    console.log(localStorage.getItem('authToken'))

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            //call to a mock api, we can change this later when we make the back-end
            let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
            setData(response.data)
        }
        fetchData()

    }, [])



    return (
        <>

            <body>


                <div className = "welcome1">WELCOME TO</div>
                <div className = "welcome2">S.O.G.U.</div>
                {/* <div className = "welcome2">
                    <div className = "bigLetter">S.</div>
                    <div className = "smallLetter">tocks</div>
                    <div className = "bigLetter">O.</div>
                    <div className = "smallLetter">nly</div>
                    <div className = "bigLetter">G.</div>
                    <div className = "smallLetter">o</div>
                    <div className = "bigLetter">U.</div>
                    <div className = "smallLetter">p</div>
                </div> */}


                <Announcements />




            </body>

        </>)


}
export default Dashboard