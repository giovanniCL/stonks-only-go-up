import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StonkPreview from './StonkPreview'

//This component serves to test the StonkPreview component, which shows the single stonks

//This code could be reused later for the hype stonks or my stonks pages as they both will fetch 
//stonk data and list a bunch of StonkPreview components.

const StonkPreviewTest = (props) => {

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
        <h1>Click on a Stonk</h1>
        {data.map((item) => (
            <StonkPreview key = {item.name} details = {item}/> 
        ))}
        </>
      
    )
}

export default StonkPreviewTest