const cors = require('cors')
const axios = require('axios')
const now = require("performance-now")

module.exports = function (app) {
    app.post('/single-stonk/:name', cors(), async (req, res) => {

        // TickerSymbol from post request
        const tickerSymbol = req.body.ticker

        // Grabs the Bulk of the Company Info Data
        async function grabCompanyInfo(companyInfo, stonkQuote) {
            const companyDataCall = `https://finnhub.io/api/v1/stock/profile2?symbol=${tickerSymbol}&token=${process.env.FINNHUB_KEY}`
            try {
                let rawStonkBasicData = await axios.get(companyDataCall)

                companyInfo["website"] = rawStonkBasicData.data.weburl
                companyInfo["name"] = rawStonkBasicData.data.name
                companyInfo["logo"] = rawStonkBasicData.data.logo
                companyInfo["exchange"] = rawStonkBasicData.data.exchange
                companyInfo["country"] = rawStonkBasicData.data.country

                stonkQuote["Market Cap."] = rawStonkBasicData.data.marketCapitalization
                stonkQuote["Shares Out."] = rawStonkBasicData.data.shareOutstanding

            } catch (error) { console.log(error) }
        }

        // Grabs the Company Quote (financial stuff)
        async function grabCompanyQuote(stonkQuote) {
            const quoteCall = `https://finnhub.io/api/v1/quote?symbol=${tickerSymbol}&token=${process.env.FINNHUB_KEY}`
            try {
                let rawStonkQuote = await axios.get(quoteCall)
                stonkQuote["Price"] = rawStonkQuote.data.c
                stonkQuote["High"] = rawStonkQuote.data.h
                stonkQuote["Low"] = rawStonkQuote.data.l
                stonkQuote["Open"] = rawStonkQuote.data.o
                stonkQuote["Previous Close"] = rawStonkQuote.data.pc
            } catch (error) { console.log(error) }
        }

        // Grabs the leftover Company Data and some Quote
        async function grabCompanyAdditionalData(companyInfo, stonkQuote) {
            const additionalCompanyData = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${tickerSymbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
            try {
                let rawAdditionalCompany = await axios.get(additionalCompanyData)
                companyInfo["description"] = rawAdditionalCompany.data.Description
                companyInfo["industry"] = rawAdditionalCompany.data.Industry
                stonkQuote["EPS"] = rawAdditionalCompany.data.EPS
                stonkQuote["Dividend Yield"] = rawAdditionalCompany.data.DividendYield + "%"
                stonkQuote["Dividend Per Share"] = rawAdditionalCompany.data.DividendPerShare
            } catch (error) { console.log(error) }
        }

        // Grabs the company graph data
        async function grabGraphData() {
            function niceTimestampFormat(stringToFormat) {
                let bigTimestamp = stringToFormat.split(' ')[0]
                let smallTimestamp = stringToFormat.split(' ')[1]
                if (!!smallTimestamp) { // If intraday
                    const dropEndTime = smallTimestamp.split(":").slice(0, 2).join(":")
                    let hourTime = dropEndTime.split(":")[0]
                    if (parseInt(hourTime) > 12) {
                        return [parseInt(hourTime) - 12, dropEndTime.split(":")[1]].join(":")
                    } else {
                        return dropEndTime
                    }
                } else { // If counted by days (anything besides 24 hr)
                    return bigTimestamp.split('-').slice(1, 3).join('/')
                }
            }
            async function processAPICall(apiCall, time) {
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
                    return { YData: [...graphYDataRaw], XData: [...graphXDataRaw] }
                } catch (error) { console.log(error); }
            }
            /////

            const graphicalData = {
                masterYData: null,
                masterXData: null,
                todayTimeseriesYData: null,
                todayTimeseriesXData: null,
            }

            const masterCall = await processAPICall(
                `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickerSymbol}&outputsize=full&apikey=${process.env.ALPHA_VANTAGE_KEY}`,
                "Daily",
            )

            graphicalData.masterYData = masterCall.YData
            graphicalData.masterXData = masterCall.XData

            //////
            const todayCall = await processAPICall(
                `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickerSymbol}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_KEY}`,
                "5min"
            )
            const startTimeIndex = todayCall.XData.findIndex(o => o === "09:30")
            const endTimeIndex = todayCall.XData.findIndex(o => o === "4:00")

            graphicalData.todayTimeseriesYData = [...todayCall.YData.slice(startTimeIndex !== -1 ? startTimeIndex : 0, endTimeIndex + 1)]
            graphicalData.todayTimeseriesXData = [...todayCall.XData.slice(startTimeIndex !== -1 ? startTimeIndex : 0, endTimeIndex + 1)]

            ////
            fullCompanyInfo.graph = graphicalData
            return

        }

        // Final Response
        const fullCompanyInfo = {
            companyInfo: {
                name: "",
                description: "",
                industry: "",
                country: "",
                website: "",
                logo: "",
                exchange: "",
            },
            stonkQuote: {
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
            },
            graph: {},
            tickerSymbol: req.body.ticker,
            executionTime: null
        }

        // Start Timer
        const startTime = now()

        // One At Time = about 500 ms
        // In parallel = about 350 ms

        // Main Company Info API Calls
        let companyInfoPromise = grabCompanyInfo(fullCompanyInfo.companyInfo, fullCompanyInfo.stonkQuote)
        let companyQuotePromise = grabCompanyQuote(fullCompanyInfo.stonkQuote)
        let additionalCompanyPromise = grabCompanyAdditionalData(fullCompanyInfo.companyInfo, fullCompanyInfo.stonkQuote)

        let graphicalDataPromise = grabGraphData(fullCompanyInfo)

        await Promise.all([ // Promise to wait for all to finish
            companyInfoPromise,
            companyQuotePromise,
            additionalCompanyPromise,
            graphicalDataPromise
        ])

        // End Timer
        var endTime = now()

        // Total Time of Execution
        const totalTimeTaken = (endTime - startTime.toFixed(3)).toFixed(3)
        //console.log("Total execution time... ", totalTimeTaken, "  milliseconds!")
        fullCompanyInfo.executionTime = totalTimeTaken

        // Final Sendoff Data
        res.json(fullCompanyInfo)
    })
}