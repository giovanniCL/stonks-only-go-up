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

async function getHypeScores(){
    Stonk.find(async(err, stonks) =>{
        stonk_symbols = stonks.map(stonk=>stonk.symbol)//get stonk symbols for querying twitter api
        const reps = 3
        let stonk_count = {}
        for(let i = 0; i < reps; i++){
            let new_stonk_count = await iterate(stonk_symbols)
            console.log(new_stonk_count )
            stonk_symbols.forEach(symbol=>{
                let old_count = stonk_count[symbol] ? stonk_count[symbol] : 0
                let new_count = new_stonk_count[symbol] ? new_stonk_count[symbol] : 0
                stonk_count[symbol] = old_count + new_count
            })
        }
        console.log(stonk_count)
        stonks.forEach(stonk=>{ //update stonks in database
            let symbol = stonk.symbol
            let stonkometer = stonk_count[symbol] ? (stonk_count[symbol]/reps) * 10  : 0// For now the stonkometer will just be the word count times 10
            stonkometer = stonkometer > 100? 100 : stonkometer // It will not go past 100
            stonkometer = (stonkometer + stonk.stonkometer)/2 
            db.collections.stonks.updateOne({symbol : symbol},{
                $set: {stonkometer : stonkometer}
            })
        }) 
        
    })
}

async function iterate(stonk_symbols){
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
            //console.log(batch.data)
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
    return stonk_count 
}

setInterval(getHypeScores,60000)

router.get('/stonks', (req, res) =>{
    
    Stonk.find({},(err, stonks)=>{
        stonks.sort((a,b)=> a.stonkometer < b.stonkometer ? 1 :-1)
        let hypest = stonks.length >= 10 ? stonks.slice(0,10) : stonks
        res.json(hypest)
    })
    
})



module.exports = router