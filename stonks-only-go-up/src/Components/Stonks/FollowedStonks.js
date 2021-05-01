import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import StonkPreview from './StonkPreview'
import StonksHeader from './StonksHeader'
import {Authentication} from '../../AuthContext'
import './HypeStonks.css'

const FollowedStonks = (props) => {

    const [data, setData] = useState([])
    const {authData, setAuthData} = useContext(Authentication)


    //SIGNING IN USER TO TEST FOLLOW BUTTON
    /*
    useEffect(async()=>{
    let authentication = await axios.post('http://localhost:8080/api/auth/login',{
            user_name : "Stonk_Guy_420",
            password : "PASSWORD"
        })
        setAuth(authentication.data.token)
    
    },[])
    */

    useEffect(()=>{
        if(!authData) return
        async function fetchData(){
            let response = await axios(`http://localhost:8080/follow/stonks`,{
                headers:{
                    "x-access-token" : authData.token
                }
            })
            setData(response.data)
        }
        fetchData()
       
    },[authData])
   
    return (
        <div className = "hype-div">
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