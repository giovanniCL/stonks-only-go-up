import React from 'react'
import {Link} from 'react-router-dom'
import './StonkPreview.css'

const StonkPreview = (props) =>{

    //This function receives a stonkometer score and returns the class for css styling
    function stonkClass(stonkometer){
        if(stonkometer > 75) return "hypestonk"
        else if(stonkometer >25) return "mehstonk"
        else return "unhypestonk"
    }

    return (
        <Link to = "single-stonk" style ={{textDecoration:"none"}}className = "container">
            <div className = "name">{props.details.name}</div>
            <div className= {stonkClass(props.details.stonkometer)}>{props.details.stonkometer + "%"}</div>
            <div className = "price">{props.details.price}</div>
        </Link>
    )
}

export default StonkPreview