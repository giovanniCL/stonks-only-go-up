import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StonkPreview from './StonkPreview'
import StonksHeader from './StonksHeader'
import './HypeStonks.css'

const HypeStonks = (props) => {

    const [data, setData] = useState([])

    useEffect(()=>{
        async function fetchData(){
            //call to a mock api, we can change this later when we make the back-end
            let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
            setData(response.data)
        }
        fetchData()
       
    },[])
   
    return (
        <>
        <div><h2>NavBar goes here </h2> </div>
        <div className = "hype-content">
            <h1>Hype Stonks</h1>
            <StonksHeader />
            {data.map((item) => (
            <StonkPreview key = {item.name} details = {item}/> 
            ))}
        </div>
        </>
      
    )
}

export default HypeStonks