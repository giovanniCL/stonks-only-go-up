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

        await Promise.all([ // Promise to wait for all to finish
            companyInfoPromise,
            companyQuotePromise,
            additionalCompanyPromise
        ])

        // End Timer
        var endTime = now()

        // Total Time of Execution
        const totalTimeTaken = (endTime - startTime.toFixed(3)).toFixed(3)
        console.log("Total execution time... ", totalTimeTaken, "  milliseconds!")
        fullCompanyInfo.executionTime = totalTimeTaken

        // Final Sendoff Data
        res.json(fullCompanyInfo)
    })
}