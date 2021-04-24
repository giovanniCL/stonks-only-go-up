require('dotenv').config()
const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../db')
const cors = require('cors');
const { Stonk } = require('../schemas');
const { EconomicData } = require('finnhub');
const twitter_bearer = process.env.TWITTER_BEARER

router.use(cors())

router.get('/update', async (req, res) => {
    Stonk.find(async(err, stonks) =>{
        stonk_symbols = stonks.map(stonk=>stonk.symbol)//get stonk symbols for querying twitter api
        let query = ""
        let data = []
        for(i in stonk_symbols){
            symbol = stonk_symbols[i]
            if(i == 0){ //set the query to the first symbol
                query = symbol
                continue
            }
            let new_symbol = ` OR ${symbol}`
            if(query.length +  new_symbol.length > 512 ){ //If query has more than 512 characters(the limit), make the api call
                let batch = await axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${query}`,{
                    headers:{
                        Authorization: twitter_bearer
                    }
                })
                data.push(...batch.data.data) //add tweets to data
                query = symbol
            }else{
                query += new_symbol //If we can still fit more symbols into the query, add symbol to query
            }
            if(i == stonk_symbols.length -1){// When we reach the last symbol, make the final call to twitter api
                let batch = await axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${query}`,{
                    headers:{
                        Authorization: twitter_bearer
                    }
                })
                console.log(batch.data)
                data.push(...batch.data.data)
            }
        }
        let stonk_count = {}
        for(d in data){ // For each tweet, look for each of the symbols. Whenever they match, increase its count
            let tweet = data[d]
            let text = tweet.text
            for(s in stonk_symbols){
                let symbol = stonk_symbols[s]
                let regex_string = ".*" + symbol
                let regex = new RegExp(regex_string, 'i')
                let match = text.search(regex)
                if(match > -1){
                    if(stonk_count[symbol]) stonk_count[symbol]++
                    else stonk_count[symbol] = 1
                }
            }
        }
        stonk_symbols.forEach(symbol=>{ //update stonks in database
            let stonkometer = stonk_count[symbol] ? stonk_count[symbol] * 10  : 0// For now the stonkometer will just be the word count times 10
            stonkometer = stonkometer > 100? 100 : stonkometer // It will not go past 100
            db.collections.stonks.updateOne({symbol : symbol},{
                $set: {stonkometer : stonkometer}
            })
        })
       
        res.send(stonk_count)
       
    })

})



module.exports = router