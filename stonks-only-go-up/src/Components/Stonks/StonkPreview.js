import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const StonkPreview = (props) => {
    const [nameClass, setNameClass] = useState("name")
    const [stonkClass, setStonkClass] = useState(getStonkClass(props.details.stonkometer))
    const [priceClass, setPriceClass] = useState("price")
    //This function receives a stonkometer score and returns the class for css styling
    function getStonkClass(stonkometer) {
        if (stonkometer > 75) return "hypestonk"
        else if (stonkometer > 25) return "mehstonk"
        else return "unhypestonk"
    }

    //Fuctions for changing the class of the elements within the component to react to the hover action
    function hoverClass() {
        setNameClass("hoverClass")
        setStonkClass("hoverClass")
        setPriceClass("hoverClass")

    }

    function unHoverClass() {
        setNameClass("name")
        setStonkClass(getStonkClass(props.details.stonkometer))
        setPriceClass("price")
    }

    return (
        <Link className="link-wrapper-list" to={`/single-stonk/${props.details.symbol}`} query={{ name: props.details.symbol }} style={{ textDecoration: "none" }} className="preview-container"
            onMouseEnter={() => hoverClass()} onMouseLeave={() => unHoverClass()}>
            <div className="stonk-preview-row">
                <div className="company-td">{props.details.name}</div>
                <div className="ticker-td">{props.details.symbol ? props.details.symbol : props.details.name} </div>
                <div className={`${stonkClass} score-td`}>{(props.details.stonkometer ? Math.round(props.details.stonkometer) : "0") + "%"}</div>
                <div className={`${priceClass} price-td`}>{props.details.currentPrice ? props.details.currentPrice : props.details.price}</div>
            </div>
        </Link>



    )
}

export default StonkPreview