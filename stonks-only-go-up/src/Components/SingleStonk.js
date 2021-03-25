import React from 'react'
import Navbar from './Navbar'
import './SingleStonk.css'


function SingleStonk({ match }){
    return(
        <>
        <div><Navbar /></div>

    


        <div className = "singleStonk_top">

        <h1> {match.params.name}</h1>
        

        </div>

        <div className = "singleStonk_graph"></div>

        <div className = "singleStonk_bottom">
        <h2 id = "price">Price: </h2>
        <h2 id = "volume">Volume: </h2>


        </div>





        
        </>
    )
}

export default SingleStonk