import Navbar from '../Navbar'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import StonkPreview from '../Stonks/StonkPreview'
import StonksHeader from '../Stonks/StonksHeader'
import './Dashboard.css'
import { Authentication } from "../../AuthContext";
import {TwitterTweetEmbed} from 'react-twitter-embed'

import Diamond from "../../Assets/diamond.jpg"

import Announcements from "./Announcements"
require('dotenv').config()

const Dashboard = (props) => {

    const { authData, setAuthData } = useContext(Authentication);
    console.log(authData)
    console.log(localStorage.getItem('authToken'))

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            let response = await axios(`${process.env.REACT_APP_SERVER}/hype/tweets`)
            setData(response.data)
            console.log(response.data)
            console.log(data)
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
                <div className = "tweet-container">
                    {data.map((item)=>{
                        return <TwitterTweetEmbed key = {item.id} tweetId = {item.id} />
                    })}
                </div>




            </body>

        </>)


}
export default Dashboard