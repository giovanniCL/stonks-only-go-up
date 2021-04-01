import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Line } from 'react-chartjs-2';

function SingleStonkGraph(props) {
    console.log(props)

    let stonkTicker = props.ticker

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

    const key = "T4WHPV41IANODLYQ" // API Key

    // for 5 min inteervals today https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo

    useEffect(() => {
        async function getGraphData() {
            try {
                let stonkData = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stonkTicker}&apikey=${key}`)
                let timeSeriesRawData = stonkData.data['Time Series (Daily)']
                let graphYDataRaw = []
                let graphXDataRaw = []
                Object.keys(timeSeriesRawData).forEach((eachTimeSeriesData) => {
                    let pointTimestamp = eachTimeSeriesData
                    let pointPriceOpening = timeSeriesRawData[eachTimeSeriesData]['1. open']
                    graphYDataRaw.push(pointPriceOpening)
                    graphXDataRaw.push(pointTimestamp)

                })
                graphYDataRaw = graphYDataRaw.reverse()
                graphXDataRaw = graphXDataRaw.reverse()

                setMasterGraphYData(graphYDataRaw)
                setMasterGraphXData(graphXDataRaw)

                setCurrentGraphYData([...graphYDataRaw])
                setCurrentGraphXData([...graphXDataRaw])
            } catch (error) { console.log(error) }
        }
        getGraphData()
    }, [])

    return (
        <div id="graph-wrapper">
            <div className="top-graph-time-directory">
                <ul className="top-graph-time-inner-list">
                    {timeSeriesOptions.map((timeSir, timeSeriesIndex) => {
                        return (
                            <li key={timeSeriesIndex}>
                                <button
                                    className={currentTimeSeries === timeSir.label ? "selected-time-series" : ""}
                                    onClick={() => handleTimeSeriesClick(timeSir)}
                                >
                                    {timeSir.label}
                                </button>
                            </li>
                        )
                    })}

                </ul>
            </div>
            {currentGraphYData.length !== 0 &&
                (
                    <div>
                        <Line
                            id="graph-wrapper"
                            legend={{
                                display: false,

                            }}
                            data={{
                                labels: currentGraphXData,
                                datasets: [{
                                    data: currentGraphYData,
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 0,
                                    fill: true,
                                    lineTension: 0,
                                    backgroundColor: '#fff382',
                                    pointRadius: 2,
                                    pointHitRadius: 5,
                                    pointBorderColor: 'black',
                                    pointHoverBorderColor: 'black',
                                }]
                            }}
                            options={{
                                title: {
                                    fontColor: 'white',
                                    display: true,
                                    text: `${stonkTicker} Stonk History Price`,
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
                                            labelString: 'Date',
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
                )}
        </div>
    )
}
export default SingleStonkGraph