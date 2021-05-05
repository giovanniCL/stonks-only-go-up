import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import StonkPreview from './StonkPreview'
import StonksHeader from './StonksHeader'
import { Authentication } from '../../AuthContext'
import './HypeStonks.css'

import MustBeSignedAction from "./MustBeSignedAction"
require('dotenv').config()


const FollowedStonks = (props) => {

    const [data, setData] = useState([])
    const { authData } = useContext(Authentication)

    console.log(!authData)


    useEffect(() => {
        if (!authData) return
        async function fetchData() {
            let response = await axios(`${process.env.REACT_APP_SERVER}/follow/stonks`, {
                headers: {
                    "x-access-token": authData.token,
                    "user_name": authData.user_name
                }
            })
            setData(response.data)
        }
        fetchData()

    }, [authData])

    if (!authData.token) {
        return (
            <MustBeSignedAction {...props} />
        )
    } else {
        return (
            <div className="hype-div">
                <div className="hype-content">
                    <h1 className="list-hype-view-header">Your Followed Stonks</h1>
                    <div id="table-wrapper">
                        <StonksHeader />
                        {data.map((item) => (
                            <StonkPreview key={item.symbol} details={item} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

}

export default FollowedStonks