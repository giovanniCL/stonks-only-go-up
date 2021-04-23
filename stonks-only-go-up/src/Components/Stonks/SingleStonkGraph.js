import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Line } from 'react-chartjs-2';
import { niceTimestampFormat } from "../../FunctionBucket"
require('dotenv').config()

function SingleStonkGraph(props) {

    let stonkTicker = props.ticker

    const [loadingGraph, setLoadingGraph] = useState(true)

    // Error Handling for Graph API
    const [graphicalError, setGraphicalError] = useState(false)

    // For the duration of the graph
    const timeSeriesOptions = [
        { label: "1Y", daysConvert: "255" },
        { label: "6M", daysConvert: "132" },
        { label: "3M", daysConvert: "66" },
        { label: "1M", daysConvert: "22" },
        { label: "1W", daysConvert: "7" },
        { label: "1D", daysConvert: "1" },
    ]

    const [currentTimeSeries, setTimeSeries] = useState(timeSeriesOptions[timeSeriesOptions.length - 1])

    function handleTimeSeriesClick(newSeries) {
        setTimeSeries(newSeries)

        let cutNumberFrom = masterGraphYData.length - newSeries.daysConvert // Doesnt matter if y or x
        let cutNumberTo = masterGraphYData.length

        if (cutNumberFrom <= 0) { // If we dont have enough data and it goes past
            cutNumberFrom = 0
        }

        let tempCurrentGraphYData = [...masterGraphYData].splice(cutNumberFrom, cutNumberTo)
        let tempCurrentGraphXData = [...masterGraphXData].splice(cutNumberFrom, cutNumberTo)

        if (tempCurrentGraphXData.length > 50) {
            tempCurrentGraphXData = [...tempCurrentGraphXData].filter(function (value, index) {
                return (index + 1) % 3 !== 0;
            });
        }
        if (tempCurrentGraphYData.length > 50) {
            tempCurrentGraphYData = [...tempCurrentGraphYData].filter(function (value, index) {
                return (index + 1) % 3 !== 0;
            })
        }
        setCurrentGraphYData(tempCurrentGraphYData)
        setCurrentGraphXData(tempCurrentGraphXData)
    }

    // The main data we fetch, since we dont want to keep refetching
    const [masterGraphYData, setMasterGraphYData] = useState([])
    const [masterGraphXData, setMasterGraphXData] = useState([])

    // The current display graph data
    const [currentGraphYData, setCurrentGraphYData] = useState([])
    const [currentGraphXData, setCurrentGraphXData] = useState([])

    // For the daily (Today)
    const [dailyTimeseriesYData, setDailyTimeseriesYData] = useState([])
    const [dailyTimeseriesXData, setDailyTimeseriesXData] = useState([])

    const key = process.env.REACT_APP_ALPHA_VANTAGE_KEY

    useEffect(() => {
        console.log("running time")
        const intraDayStonkData = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stonkTicker}&interval=5min&apikey=${key}`
        const dailyStonkData = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stonkTicker}&outputsize=full&apikey=${key}`
        async function getGraphData(apiCall, time) {
            try {
                let stonkData = await axios.get(apiCall)
                let timeSeriesRawData = stonkData.data[`Time Series (${time})`]
                let graphYDataRaw = []
                let graphXDataRaw = []
                if (!!stonkData.data.Note) { // if api calls be wildin
                    throw Error(stonkData.data.Note)
                }
                Object.keys(timeSeriesRawData).forEach((eachTimeSeriesData) => {
                    let pointTimestamp = niceTimestampFormat(eachTimeSeriesData)
                    let pointPriceOpening = timeSeriesRawData[eachTimeSeriesData]['1. open']
                    graphYDataRaw.push(pointPriceOpening)
                    graphXDataRaw.push(pointTimestamp)
                })
                graphYDataRaw = graphYDataRaw.reverse()
                graphXDataRaw = graphXDataRaw.reverse()

                if (time === "Daily") {
                    setMasterGraphYData(graphYDataRaw)
                    setMasterGraphXData(graphXDataRaw)
                    setCurrentGraphYData([...graphYDataRaw])
                    setCurrentGraphXData([...graphXDataRaw])
                    getGraphData(intraDayStonkData, "5min")
                } else if (time === "5min") {
                    const startTimeIndex = graphXDataRaw.findIndex(o => o === "09:30")
                    const endTimeIndex = graphXDataRaw.findIndex(o => o === "4:00")
                    setDailyTimeseriesYData([...graphYDataRaw.slice(startTimeIndex !== -1 ? startTimeIndex : 0, endTimeIndex + 1)])
                    setDailyTimeseriesXData([...graphXDataRaw.slice(startTimeIndex !== -1 ? startTimeIndex : 0, endTimeIndex + 1)])
                    setLoadingGraph(false)
                }
            } catch (error) { console.log(error); setGraphicalError(true) }
        }
        getGraphData(dailyStonkData, "Daily")
       
    }, [stonkTicker])

    return (
        <section id={graphicalError || loadingGraph ? "empty-graph-wrapper" : "graph-wrapper"}>
            <div className="upper-graph-header">
                <div className="left-upper-graph">
                    <img className="left-upper-graph-logo" src={props.logo} alt="" />
                    <h4 className="left-upper-graph-subheader">{props.stonkName}</h4>
                </div>
                <h4 className="right-upper-graph-subheader">{props.ticker}</h4>
            </div>
            {graphicalError ? (
                <h3 className="empty-graph-header">There was a problem retrieving graphical data, please try again later.</h3>
            ) : (
                <>
                    {currentGraphYData.length !== 0 ?
                        (
                            <>
                                <div className="top-graph-time-directory">
                                    <ul className="top-graph-time-inner-list">
                                        {timeSeriesOptions.map((timeSir, timeSeriesIndex) => {
                                            return (
                                                <li key={timeSeriesIndex}>
                                                    <button
                                                        className={currentTimeSeries === timeSir.label ? "selected-time-series" : ""}
                                                        onClick={() => {
                                                            if (timeSir.label === "1D") {
                                                                setTimeSeries(timeSir)
                                                            } else {
                                                                handleTimeSeriesClick(timeSir)
                                                            }
                                                        }}
                                                    >
                                                        {timeSir.label}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    <Line
                                        id="graph-wrapper"
                                        legend={{
                                            display: false,
                                        }}
                                        data={{
                                            labels: currentTimeSeries.label === "1D" ? dailyTimeseriesXData : currentGraphXData,
                                            datasets: [{
                                                data: currentTimeSeries.label === "1D" ? dailyTimeseriesYData : currentGraphYData,
                                                borderColor: '#7926ff',
                                                borderWidth: 4,
                                                fill: false,
                                                lineTension: 0,
                                                backgroundColor: '#7926ff',
                                                pointRadius: 0,
                                                pointHitRadius: 5,
                                                pointBorderColor: 'black',
                                                pointHoverBorderColor: 'black',
                                            }]
                                        }}
                                        options={{
                                            title: {
                                                fontColor: 'white',
                                                display: true,
                                            },

                                            tooltips: {
                                                mode: 'index',
                                                intersect: false
                                            },
                                            hover: {
                                                mode: 'index',
                                                intersect: false,
                                            },
                                            scales: {
                                                xAxes: [{
                                                    display: true,
                                                    ticks: { fontColor: 'white' },
                                                    scaleLabel: {
                                                        display: true,
                                                        labelString: currentTimeSeries.label === "1D" ? "Time" : 'Date',
                                                        fontColor: 'white',
                                                        fontStyle: 'bold'
                                                    },
                                                }],
                                                yAxes: [{
                                                    display: true,
                                                    ticks: { fontColor: 'white' },
                                                    scaleLabel: {
                                                        display: true,
                                                        labelString: 'Price (USD $)',
                                                        fontColor: 'white',
                                                        fontStyle: 'bold'
                                                    }
                                                }]
                                            }
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <h3 className="empty-graph-header">Loading...</h3>
                        )}
                </>
            )}

        </ section>
    )
}
export default SingleStonkGraph