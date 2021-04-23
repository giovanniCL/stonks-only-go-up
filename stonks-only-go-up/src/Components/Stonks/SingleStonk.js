import React, { useState, useEffect } from 'react'
import SingleStonkGraph from "./SingleStonkGraph"
import Navbar from '../Navbar'
import './SingleStonk.css'
import { ArrowLeft } from 'react-feather'
import HypeMeter from "../HypeMeter"
import axios from "axios"

function SingleStonk(props) {
    // Note. ticker should be passed down from props.match.params.name
    const tickerSymbol = "SBUX"
    console.log(props)

    const [loadingStonkData, setLoadingStonkData] = useState(true)

    //SIGNING IN USER TO TEST FOLLOW BUTTON
    const [auth, setAuth] = useState()
    const [following, setFollowing] = useState(false)

    /*
    useEffect(() => {
        async function authPost() {
            let authentication = await axios.post('http://localhost:8080/api/auth/login', {
                user_name: "Stonk_Guy_420",
                password: "PASSWORD"
            })
            setAuth(authentication.data.token)
        }
        authPost()
    }, [])

    useEffect(() => {
        async function authHeaders() {
            if (!auth) return
            let user = await axios.get('http://localhost:8080/api/auth/me', {
                headers: {
                    "x-access-token": auth
                }
            })
            setFollowing(user.data.followed ? user.data.followed.includes(tickerSymbol) : false)
        }
        authHeaders()
    }, [auth])
 */

    async function follow_unfollow() {
        await axios.get(`http://localhost:8080/follow/${tickerSymbol}`, {
            headers: {
                "x-access-token": auth
            }
        })
        setFollowing(!following)
    }

    useEffect(() => {

        async function grabFullStonkData() {
            let expressRes = await axios.post('/single-stonk/:name', { ticker: "SBUX" })
            console.log(expressRes)
            console.log("execution time... ", expressRes.data.executionTime)
            setCompanyInfo(expressRes.data.companyInfo)
            setStonkQuote(expressRes.data.stonkQuote)
            setLoadingStonkData(false)
        }
        grabFullStonkData()
    }, [])

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
                                        <td className="each-stonk-table-row-end"><a href={companyInfo.website} target="_blank">{companyInfo.website}</a></td>
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

                </article>
            )}


        </>
    )
}

export default SingleStonk