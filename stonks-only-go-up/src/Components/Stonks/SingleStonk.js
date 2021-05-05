import React, { useState, useEffect, useContext } from 'react'
import SingleStonkGraph from "./SingleStonkGraph"
import { ArrowLeft, AlertCircle } from 'react-feather'
import HypeMeter from "../HypeMeter"
import axios from "axios"
import { Authentication } from '../../AuthContext'
import MustBeSignedAction from "./MustBeSignedAction"
import { BigLoading } from "../Loading"
require('dotenv').config()

function SingleStonk(props) {
    // Note. ticker should be passed down from props.match.params.name
    const [tickerSymbol, setPassedTicker] = useState(props.match.params.name)
    useEffect(() => {
        setPassedTicker(props.match.params.name)
    }, [props.match.params])
    console.log(props.match.params.name)

    const [loadingStonkData, setLoadingStonkData] = useState(true)

    const { authData } = useContext(Authentication)
    const [following, setFollowing] = useState(false)


    useEffect(() => {
        console.log("running auth header")
        async function authHeaders() {
            try {
                if (!authData.token) return
                let user = await axios.get(`${process.env.REACT_APP_SERVER}/api/auth/me`, {
                    headers: {
                        "x-access-token": authData.token
                    }
                })
                setFollowing(user.data.followed ? user.data.followed.includes(props.match.params.name) : false)
            } catch (_) { setInvalidStonk(true) }
        }
        authHeaders()
    }, [authData, props.match.params.name])



    async function follow_unfollow() {
        try {
            if (!authData.token) return
            await axios.get(`${process.env.REACT_APP_SERVER}/follow/${props.match.params.name}`, {
                headers: {
                    "x-access-token": authData.token
                }
            })
            setFollowing(!following)
        } catch (_) { setInvalidStonk(true) }
    }

    const [invalidStonk, setInvalidStonk] = useState(false)
    useEffect(() => {
        if (!authData.token) return
        async function grabFullStonkData() {
            try {
                let expressRes = await axios.post(`${process.env.REACT_APP_SERVER}/single-stonk/:name`, { ticker: props.match.params.name })
                console.log(expressRes)
                console.log(expressRes.data)
                if (!!expressRes.data.failure) { setInvalidStonk(true); setLoadingStonkData(false); return }
                setCompanyInfo({ ...expressRes.data.companyInfo })
                setStonkQuote({ ...expressRes.data.stonkQuote })
                setGraph({ ...expressRes.data.graph })
                setLoadingStonkData(false)
            } catch (error) { console.log(error); setLoadingStonkData(false); setInvalidStonk(true) }
        }
        grabFullStonkData()
    }, [authData.token, props.match.params.name])

    const [companyInfo, setCompanyInfo] = useState({
        name: "",
        description: "",
        industry: "",
        country: "",
        website: "",
        logo: "",
        exchange: "",
    })

    const [stonkQuote, setStonkQuote] = useState({
        "Price": '--',
        "EPS": "--",
        "High": '--',
        "Low": '--',
        "Open": '--',
        "Previous Close": '--',
        "Market Cap.": '--',
        "Shares Out.": '--',
        "Dividend Yield": "--",
        "Dividend Per Share": "--",
    })
    const [graph, setGraph] = useState({})

    const [hypeScore, setHypeScore] = useState(89)

    if (!authData.token) {
        return (
            <MustBeSignedAction {...props} />
        )
    }
    return (
        <>
            {loadingStonkData ? (
                <div id="loading-full-empty-single-stonk">
                    <h2 className="basic-loading-header"><BigLoading /></h2>
                </div>
            ) : (
                <article id="single-stonk-viewer-page">
                    {invalidStonk ? (
                        <div id="invalid-stonk-wrapper">
                            <div id="error-symbol"><AlertCircle size={64} /></div>
                            <h1>The Stonk Symbol is Invalid!</h1>
                            
                            <p>Please check you inputted the correct ticker symbol and try again!</p>
                        </div>


                    ) : (
                        <>
                            <div className="top-single-stonk-viewer-wrapper">
                                <button className="go-back-single-bttn" onClick={() => {
                                    props.history.push('/hype-stonks')
                                }}>
                                    <ArrowLeft className="back-single-icon" />Back to Main Viewer
                        </button>
                            </div>
                            <div className="stonk-graph-outer-wrapper">
                                <SingleStonkGraph
                                    graph={graph}
                                    stonkName={companyInfo.name}
                                    logo={companyInfo.logo}
                                    ticker={tickerSymbol}
                                />
                            </div>
                            <section id="single-stonk-bottom-half">
                                <div className="stonk-top-from-bottom-half">
                                    <h2 className="stonk-name-bottom">{companyInfo.name}</h2>
                                    <p className="stonk-description-bottom">{companyInfo.description}</p>
                                    <table className="stonk-table-info">
                                        <tbody>
                                            <tr className="each-stonk-table-row">
                                                <td className="each-stonk-table-row-start">Industry</td>
                                                <td className="each-stonk-table-row-end">{companyInfo.industry}</td>
                                            </tr>
                                            <tr className="each-stonk-table-row">
                                                <td className="each-stonk-table-row-start">Country</td>
                                                <td className="each-stonk-table-row-end">{companyInfo.country}</td>
                                            </tr>
                                            <tr className="each-stonk-table-row">
                                                <td className="each-stonk-table-row-start">Exchange</td>
                                                <td className="each-stonk-table-row-end">{companyInfo.exchange}</td>
                                            </tr>
                                            <tr className="each-stonk-table-row">
                                                <td className="each-stonk-table-row-start">Website</td>
                                                <td className="each-stonk-table-row-end"><a href={companyInfo.website} target="_blank" rel="noreferrer">{companyInfo.website}</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <ul className="stonk-extra-company-info">
                                    {Object.keys(stonkQuote).map((eachSpecificStonkInfo, stonkInfoIndex) => {
                                        return (
                                            <li className="each-stonk-ci" key={stonkInfoIndex}>
                                                <h2 className="stonk-info-tag">{eachSpecificStonkInfo}</h2>
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
                                <button id="follow-unfollow-button-single-viewer" onClick={() => follow_unfollow()}>{following ? "Unfollow" : "Follow"}</button>
                            </section>
                        </>
                    )}


                </article>
            )}
        </>
    )
}

export default SingleStonk