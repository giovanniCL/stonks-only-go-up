import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StonkPreview from './StonkPreview'
import StonksHeader from './StonksHeader'
import Navbar from '../Navbar'
import './HypeStonks.css'

const FollowedStonks = (props) => {

    const [data, setData] = useState([])
    const [auth, setAuth] = useState()


    //SIGNING IN USER TO TEST FOLLOW BUTTON
    useEffect(async()=>{
    let authentication = await axios.post('http://localhost:8080/api/auth/login',{
            user_name : "Stonk_Guy_420",
            password : "PASSWORD"
        })
        setAuth(authentication.data.token)
    
    },[])

    useEffect(()=>{
        if(!auth) return
        async function fetchData(){
            let response = await axios(`http://localhost:8080/follow/stonks`,{
                headers:{
                    "x-access-token" : auth
                }
            })
            setData(response.data)
        }
        fetchData()
       
    },[auth])
   
    return (
        <div className = "hype-div">     
        <div> <Navbar /> </div>
        <div className = "hype-content">
            <h1 className>Your Followed Stonks</h1>
            <StonksHeader />
            {data.map((item) => (
            <StonkPreview key = {item.symbol} details = {item}/> 
            ))}
        </div>
        </div>
      
    )
}

export default FollowedStonks