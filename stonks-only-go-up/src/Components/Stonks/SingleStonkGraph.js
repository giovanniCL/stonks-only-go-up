import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Line } from 'react-chartjs-2';
import { niceTimestampFormat } from "../../FunctionBucket"

function SingleStonkGraph(props) {

    let stonkTicker = props.ticker

    // Error Handling for Graph API
    const [graphicalError, setGraphicalError] = useState(false)

    // For the duration of the graph
    const timeSeriesOptions = [
        { label: "1 Year", daysConvert: "365" },
        { label: "6 Months", daysConvert: "132" },
        { label: "3 Months", daysConvert: "66" },
        { label: "1 Month", daysConvert: "22" },
        { label: "1 Week", daysConvert: "7" },
        { label: "24 Hours", daysConvert: "1" },
    ]

    const [currentTimeSeries, setTimeSeries] = useState(timeSeriesOptions[timeSeriesOptions.length - 1])

    function handleTimeSeriesClick(newSeries) {
        setTimeSeries(newSeries)

        let cutNumberFrom = masterGraphYData.length - newSeries.daysConvert // Doesnt matter if y or x
        let cutNumberTo = masterGraphYData.length

        if (cutNumberFrom <= 0) { // If we dont have enough data and it goes past
            cutNumberFrom = 0
        }

        setCurrentGraphYData([...masterGraphYData].splice(cutNumberFrom, cutNumberTo))
        setCurrentGraphXData([...masterGraphXData].splice(cutNumberFrom, cutNumberTo))
    }

    // The main data we fetch, since we dont want to keep refetching
    const [masterGraphYData, setMasterGraphYData] = useState([])
    const [masterGraphXData, setMasterGraphXData] = useState([])

    const [currentGraphYData, setCurrentGraphYData] = useState([])
    const [currentGraphXData, setCurrentGraphXData] = useState([])

    const [dailyTimeseriesYData, setDailyTimeseriesYData] = useState([])
    const [dailyTimeseriesXData, setDailyTimeseriesXData] = useState([])

    const key = "T4WHPV41IANODLYQ" // API Key
    const key2 = "UE3XAM9RCAF6ONBQ" // shhhh

    // for 5 min inteervals today https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo

    useEffect(() => {
        const intraDayStonkData = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stonkTicker}&interval=5min&apikey=${key}`
        const dailyStonkData = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stonkTicker}&apikey=${key2}`
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
                } else if (time === "5min") {
                    console.log('intraday')
                    setDailyTimeseriesYData([...graphYDataRaw])
                    setDailyTimeseriesXData([...graphXDataRaw])
                }

            } catch (error) { console.log(error); setGraphicalError(true) }
        }
        getGraphData(dailyStonkData, "Daily")
        getGraphData(intraDayStonkData, "5min")
    }, [stonkTicker])

    if (graphicalError) {
        return (
            <section id="graph-wrapper">
                <h3 className="empty-graph-header">There was a problem retrieving graphical data, please try again later.</h3>
            </section>
        )
    }
    return (
        <section id="graph-wrapper">
            <div className="upper-graph-header">
                <h4 className="left-upper-graph-subheader">{props.stonkName}</h4>
                <h4 className="right-upper-graph-subheader">{props.ticker}</h4>
            </div>
            <div className="top-graph-time-directory">
                <ul className="top-graph-time-inner-list">
                    {timeSeriesOptions.map((timeSir, timeSeriesIndex) => {
                        return (
                            <li key={timeSeriesIndex}>
                                <button
                                    className={currentTimeSeries === timeSir.label ? "selected-time-series" : ""}
                                    onClick={() => {
                                        if (timeSir.label === "24 Hours") {
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
            {currentGraphYData.length !== 0 ?
                (
                    <div>
                        <Line
                            id="graph-wrapper"
                            legend={{
                                display: false,
                            }}
                            data={{
                                labels: currentTimeSeries.label === "24 Hours" ? dailyTimeseriesXData : currentGraphXData,
                                datasets: [{
                                    data: currentTimeSeries.label === "24 Hours" ? dailyTimeseriesYData : currentGraphYData,
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
                                            labelString: currentTimeSeries.label === "24 Hours" ? "Time" : 'Date',
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
                ) : (
                    <h3 className="empty-graph-header">Loading...</h3>
                )}
        </section>
    )
}
export default SingleStonkGraph