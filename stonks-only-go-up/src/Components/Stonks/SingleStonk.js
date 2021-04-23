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
        const finnhubAPI = 'T4WHPV41IANODLYQ'
        async function grabCompanyInfo() {
            const companyDataCall = `https://finnhub.io/api/v1/stock/profile2?symbol=${tickerSymbol}&token=${finnhubAPI}`
            try {
                let rawStonkBasicData = await axios.get(companyDataCall)

                companyInfo["website"] = rawStonkBasicData.data.weburl
                companyInfo["name"] = rawStonkBasicData.data.name
                companyInfo["logo"] = rawStonkBasicData.data.logo
                companyInfo["exchange"] = rawStonkBasicData.data.exchange
                companyInfo["country"] = rawStonkBasicData.data.country

                stonkQuote["Market Cap."] = rawStonkBasicData.data.marketCapitalization
                stonkQuote["Shares Out."] = rawStonkBasicData.data.shareOutstanding
                setCompanyInfo({ ...companyInfo })
                setStonkQuote({ ...stonkQuote })
            } catch (error) { console.log(error) }
        }
        async function grabCompanyQuote() {
            const quoteCall = `https://finnhub.io/api/v1/quote?symbol=${tickerSymbol}&token=${finnhubAPI}`
            try {
                let rawStonkQuote = await axios.get(quoteCall)
                stonkQuote["Price"] = rawStonkQuote.data.c
                stonkQuote["High"] = rawStonkQuote.data.h
                stonkQuote["Low"] = rawStonkQuote.data.l
                stonkQuote["Open"] = rawStonkQuote.data.o
                stonkQuote["Previous Close"] = rawStonkQuote.data.pc
                setStonkQuote({ ...stonkQuote })
            } catch (error) { console.log(error) }
        }
        async function grabCompanyAdditionalData() {
            const additionalCompanyData = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${tickerSymbol}&apikey=T4WHPV41IANODLYQ`
            try {
                let rawAdditionalCompany = await axios.get(additionalCompanyData)
                companyInfo["description"] = rawAdditionalCompany.data.Description
                companyInfo["industry"] = rawAdditionalCompany.data.Industry
                stonkQuote["EPS"] = rawAdditionalCompany.data.EPS
                stonkQuote["Dividend Yield"] = rawAdditionalCompany.data.DividendYield + "%"
                stonkQuote["Dividend Per Share"] = rawAdditionalCompany.data.DividendPerShare
                setCompanyInfo({ ...companyInfo })
                setStonkQuote({ ...stonkQuote })
            } catch (error) { console.log(error) }
        }
        async function finalizeStonkData(promiseList) {
            console.log(promiseList)
            await Promise.all(promiseList)
            setLoadingStonkData(false)
        }
        let grabCompanyInfoPromise = grabCompanyInfo()
        let grabCompanyQuotePromise = grabCompanyQuote()
        let grabCompanyAdditionalPromise = grabCompanyAdditionalData()
        finalizeStonkData([grabCompanyInfoPromise, grabCompanyQuotePromise, grabCompanyAdditionalPromise])
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