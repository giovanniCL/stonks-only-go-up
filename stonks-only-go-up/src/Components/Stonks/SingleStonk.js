import React, { useState, useEffect } from 'react'
import SingleStonkGraph from "./SingleStonkGraph"
import Navbar from '../Navbar'
import './SingleStonk.css'
import { ArrowLeft } from 'react-feather'
import HypeMeter from "../HypeMeter"
import axios from "axios"

function SingleStonk(props) {
    // Note. ticker should be passed down from props.match.params.name
    const tickerSymbol = "TSLA"

    const [loadingStonkData, setLoadingStonkData] = useState(true)
    useEffect(() => {
        const finnhubAPI = 'c1rp9kaad3ifb04k9aa0'
        //const finnhubAPI2 = 'sandbox_c1rp9kaad3ifb04k9aag'
        async function grabCompanyInfo() {
            const companyDataCall = `https://finnhub.io/api/v1/stock/profile2?symbol=${tickerSymbol}&token=${finnhubAPI}`
            try {
                let rawStonkBasicData = await axios.get(companyDataCall)
                const parsedBasicData = {
                    website: rawStonkBasicData.data.weburl,
                    name: rawStonkBasicData.data.name,
                    logo: rawStonkBasicData.data.logo,
                    exchange: rawStonkBasicData.data.exchange,
                    country: rawStonkBasicData.data.country,
                }
                setCompanyInfo(parsedBasicData)

                stonkQuote["Market Cap"] = rawStonkBasicData.data.marketCapitalization
                stonkQuote["Shares Outstanding"] = rawStonkBasicData.data.shareOutstanding
                await grabCompanyQuote()
            } catch (error) { console.log(error); setLoadingStonkData(false) }
        }
        async function grabCompanyQuote() {
            const quoteCall = `https://finnhub.io/api/v1/quote?symbol=${tickerSymbol}&token=${finnhubAPI}`
            try {
                let rawStonkQuote = await axios.get(quoteCall)
                console.log(rawStonkQuote.data)
                stonkQuote["Price"] = rawStonkQuote.data.c
                stonkQuote["High"] = rawStonkQuote.data.h
                stonkQuote["Low"] = rawStonkQuote.data.l
                stonkQuote["Open"] = rawStonkQuote.data.o
                stonkQuote["Previous Close"] = rawStonkQuote.data.pc
                setStonkQuote({ ...stonkQuote })
                setLoadingStonkData(false)

            } catch (error) { console.log(error); setLoadingStonkData(false) }
        }
        grabCompanyInfo()
    }, [])

    const [companyInfo, setCompanyInfo] = useState({
        name: "",
        country: "",
        website: "",
        logo: "",
        exchange: "",
    })

    const [stonkQuote, setStonkQuote] = useState({
        "Price": '--',
        "High": '--',
        "Low": '--',
        "Open": '--',
        "Previous Close": '--',
        "Market Cap": '--',
        "Shares Outstanding": '--',
    })

    const [hypeScore, setHypeScore] = useState(89)
    return (
        <>
            <Navbar />
            {loadingStonkData ? (
                <div id="loading-full-empty-single-stonk">
                    <h2 className="basic-loading-header">Loading...</h2>
                </div>
            ) : (
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
                                stonkName={companyInfo.name}
                                logo={companyInfo.logo}
                                ticker={tickerSymbol}
                            />
                        </div>
                        <section id="single-stonk-bottom-half">
                            <div>
                                <h2>{companyInfo.name}</h2>
                                <div>
                                    <h5>Country:</h5>
                                    <p>{companyInfo.country}</p>
                                </div>
                                <div>
                                    <h5>Exchange</h5>
                                    <p>{companyInfo.exchange}</p>
                                </div>
                                <div>
                                    <h5>Website:</h5>
                                    <a href={companyInfo.website} target="_blank">{companyInfo.website}</a>
                                </div>

                            </div>
                            <ul className="stonk-extra-company-info">
                                {Object.keys(stonkQuote).map((eachSpecificStonkInfo, stonkInfoIndex) => {
                                    return (
                                        <li className="each-stonk-ci" key={stonkInfoIndex}>
                                            <h2 className="stonk-info-tag">{eachSpecificStonkInfo}: </h2>
                                            <h2 className="stonk-info-value">{stonkQuote[eachSpecificStonkInfo]}</h2>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div id="stonk-o-meter-hype-bar-single-viewer">
                                <h4 className="stonk-meter-header">Stonk-O-Meter Hype Score</h4>
                                <div className="stonk-meter">
                                    <HypeMeter score={hypeScore} />
                                </div>
                            </div>
                            <button id="follow-unfollow-button-single-viewer">Follow</button>
                        </section>

                    </article>
                )}


        </>
    )
}

export default SingleStonk