import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StonkPreview from './StonkPreview'
import StonksHeader from './StonksHeader'
import Navbar from '../Navbar'
import './HypeStonks.css'

const FollowedStonks = (props) => {

    const [data, setData] = useState([])
    const [user, setUser] = useState(["some-user"])

    useEffect(()=>{
        async function fetchData(){
            //call to a mock api, we can change this later when we make the back-end
            let response = await axios(`http://localhost:8080/follow/stonks`)
            setData(response.data)
        }
        fetchData()
       
    },[])
   
    return (
        <div className = "hype-div">     
        <div> <Navbar /> </div>
        <div className = "hype-content">
            <h1 className>Your Followed Stonks</h1>
            <StonksHeader />
            {data.map((item) => (
            <StonkPreview key = {item.name} details = {item}/> 
            ))}
        </div>
        </div>
      
    )
}

export default FollowedStonks