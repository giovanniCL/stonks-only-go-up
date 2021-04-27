import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './StonkPreview.css'

const StonkPreview = (props) =>{
    const [nameClass, setNameClass] = useState("name")
    const [stonkClass, setStonkClass] = useState(getStonkClass(props.details.stonkometer))
    const [priceClass, setPriceClass] = useState("price")
    //This function receives a stonkometer score and returns the class for css styling
    function getStonkClass(stonkometer){
        if(stonkometer > 75) return "hypestonk"
        else if(stonkometer >25) return "mehstonk"
        else return "unhypestonk"
    }

    //Fuctions for changing the class of the elements within the component to react to the hover action
    function hoverClass(){
        setNameClass("hoverClass")
        setStonkClass("hoverClass")
        setPriceClass("hoverClass")

    }

    function unHoverClass(){
        setNameClass("name")
        setStonkClass(getStonkClass(props.details.stonkometer))
        setPriceClass("price")
    }

    return (
        
        <Link to = {`/single-stonk/${props.details.name}`} style ={{textDecoration:"none"}} className= "container" 
        onMouseEnter = {()=>hoverClass()} onMouseLeave = {()=>unHoverClass()}>
            <div className = {nameClass}>{props.details.symbol ? props.details.symbol : props.details.name} </div>
            <div className= {stonkClass}>{(props.details.stonkometer ? props.details.stonkometer : "0") + "%"}</div>
            <div className = {priceClass}>{props.details.currentPrice ? props.details.currentPrice : props.details.price}</div>
        </Link>
       
    )
}

export default StonkPreview