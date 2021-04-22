import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StonkPreview from './StonkPreview'
import StonksHeader from './StonksHeader'
import Navbar from '../Navbar'
import './HypeStonks.css'

const HypeStonks = (props) => {

    const [data, setData] = useState([])

    useEffect(()=>{
        async function fetchData(){
            //call to a mock api, we can change this later when we make the back-end
            let response = await axios("http://localhost:8080/hype")
            setData(response.data)
        }
        fetchData()
       
    },[])
   
    return (
        <div className = "hype-div">     
        <div> <Navbar /> </div>
        <div className = "hype-content">
            <h1 className>Hype Stonks</h1>
            <StonksHeader />
            {data.map((item) => (
            <StonkPreview key = {item.name} details = {item}/> 
            ))}
        </div>
        </div>
      
    )
}

export default HypeStonks