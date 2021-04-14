import React from 'react'
import SingleStonkGraph from "./SingleStonkGraph"
import Navbar from '../Navbar'
import './SingleStonk.css'
import { ArrowLeft } from 'react-feather'
import HypeMeter from "../HypeMeter"

function SingleStonk(props) {
    console.log(props)
    // Note. ticker should be passed down from props.match.params.name
    const companyInfo = {
        website: "",
        logo: "",
        exchange: "",
    }

    const stonkInfo = [
        { label: "Price", value: 24 },
        { label: "Volume", value: 21 },
        { label: "High", value: 30 },
        { label: "Low", value: 20 },
        { label: "Open", value: 22 },
        { label: "Close", value: 20 },
        { label: "Market Capitalization", value: 200000 },
        { label: "Shares Outstanding", value: 20000 }
    ]
    return (
        <>
            <Navbar />
            <article id="single-stonk-viewer-page">
                <div className="top-single-stonk-viewer-wrapper">
                    <h1>Single Stonk Viewer</h1>
                    <button className="go-back-single-bttn" onClick={() => {
                        props.history.goBack()
                    }}>
                        <ArrowLeft className="back-single-icon" />Back to Main Viewer
                        </button>
                </div>
                <div className="stonk-graph-outer-wrapper">
                    <SingleStonkGraph
                        stonkName={props.match.params.name}
                        ticker={"TSLA"}
                    />
                </div>
                <section id="single-stonk-bottom-half">
                    <ul className="stonk-extra-company-info">
                        {stonkInfo.map((eachSpecificStonkInfo, stonkInfoIndex) => {
                            return (
                                <li className="each-stonk-ci" key={stonkInfoIndex}>
                                    <h2 className="stonk-info-tag">{eachSpecificStonkInfo.label}: </h2>
                                    <h2 className="stonk-info-value">{eachSpecificStonkInfo.value}</h2>
                                </li>
                            )
                        })}
                    </ul>
                    <div id="stonk-o-meter-hype-bar-single-viewer">
                        <h4 className="stonk-meter-header">Stonk-O-Meter Hype Score</h4>
                        <div className="stonk-meter">
                            <HypeMeter score={89}/>
                        </div>
                    </div>
                    <button id="follow-unfollow-button-single-viewer">Follow</button>
                </section>

            </article>

        </>
    )
}

export default SingleStonk