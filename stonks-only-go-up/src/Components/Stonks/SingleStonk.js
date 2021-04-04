import React from 'react'
import SingleStonkGraph from "./SingleStonkGraph"
import Navbar from '../Navbar'
import './SingleStonk.css'

function SingleStonk(props) {
    console.log(props)
    // Note. ticker should be passed down from props.match.params.name
    return (
        <>
            <div><Navbar /></div>
            <div className="singleStonk_top">
                <h1> {props.match.params.name}</h1>
            </div>

            <div className="stonk-graph-outer-wrapper">
                <SingleStonkGraph
                    ticker={"TSLA"}
                />
            </div>

            <div className="singleStonk_bottom">
                <h2 id="price">Price: </h2>
                <h2 id="volume">Volume: </h2>
            </div>
        </>
    )
}

export default SingleStonk