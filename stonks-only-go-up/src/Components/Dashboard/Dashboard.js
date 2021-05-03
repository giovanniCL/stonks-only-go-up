import Navbar from '../Navbar'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import StonkPreview from '../Stonks/StonkPreview'
import StonksHeader from '../Stonks/StonksHeader'
import './Dashboard.css'
import { Authentication } from "../../AuthContext";

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

                

                <div className="dashboard_wrapper">

                    <div className="dashboard_box">

                        <div className="dashboard_top">
                            <h3>Hype Stonks News</h3>
                        </div>

                        <p> The real story from yesterday’s game – the Mets were going to mess around with an opener. Jacob Barnes opened the game for the Mets and pitched a perfect inning with two strikeouts (his one bad outing was his first outing and now he hasn’t allowed a hit from his third spring outing onwards). Barnes was followed by Joey Lucchesi who allowed a run off one homer, and three hits total in 4.2 innings of work, lowering his spring ERA to 2.77. Jerry Blevins also bounced back with a scoreless outing to close out the game. All around, fun times in Mets land.</p>

                        <div className="dashboard_bottom"></div>
                    </div>

                    <div className="dashboard_box">

                        <div className="dashboard_top">
                            <h3>Your Stonks News</h3>
                        </div>

                        <p> The real story from yesterday’s game – the Mets were going to mess around with an opener. Jacob Barnes opened the game for the Mets and pitched a perfect inning with two strikeouts (his one bad outing was his first outing and now he hasn’t allowed a hit from his third spring outing onwards). Barnes was followed by Joey Lucchesi who allowed a run off one homer, and three hits total in 4.2 innings of work, lowering his spring ERA to 2.77. Jerry Blevins also bounced back with a scoreless outing to close out the game. All around, fun times in Mets land.</p>

                        <div className="dashboard_bottom"></div>
                    </div>

                    <div className="dashboard_box">

                        <div className="dashboard_top">
                            <h3>Reccomended Stonks News</h3>
                        </div>

                        <p> The real story from yesterday’s game – the Mets were going to mess around with an opener. Jacob Barnes opened the game for the Mets and pitched a perfect inning with two strikeouts (his one bad outing was his first outing and now he hasn’t allowed a hit from his third spring outing onwards). Barnes was followed by Joey Lucchesi who allowed a run off one homer, and three hits total in 4.2 innings of work, lowering his spring ERA to 2.77. Jerry Blevins also bounced back with a scoreless outing to close out the game. All around, fun times in Mets land.</p>

                        <div className="dashboard_bottom"></div>
                    </div>


                </div>

                <div className="dashboard_hot_stonks">
                    <h2>Your Hottest Stonks</h2>
                    <StonksHeader />
                    {data.map((item) => (
                        <StonkPreview key={item.name} details={item} />
                    ))}
                </div>

                <Announcements />




            </body>

        </>)


}
export default Dashboard