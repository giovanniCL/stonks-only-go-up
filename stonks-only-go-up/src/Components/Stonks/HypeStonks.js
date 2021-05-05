import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import StonkPreview from './StonkPreview'
import StonksHeader from './StonksHeader'
import Navbar from '../Navbar'
import './HypeStonks.css'
import { Authentication } from '../../AuthContext'

import MustBeSignedAction from "./MustBeSignedAction"

const HypeStonks = (props) => {

    const [data, setData] = useState([])
    const { authData } = useContext(Authentication)


    useEffect(() => {
        async function fetchData() {
            let response = await axios("http://localhost:8080/hype/stonks")
            setData(response.data)
        }
        fetchData()

    }, [])

    console.log('you in hype')
    if (!authData.token) {
        return (
            <MustBeSignedAction {...props} />
        )
    } else {
        return (
            <div className="hype-div">
                <div className="hype-content">
                    <h1 className>Your Followed Stonks</h1>
                    <StonksHeader />
                    {data.map((item) => (
                        <StonkPreview key={item.symbol} details={item} />
                    ))}
                </div>
            </div>
        )
    }

}

export default HypeStonks