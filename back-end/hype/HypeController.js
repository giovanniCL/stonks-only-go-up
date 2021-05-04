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
        const reps = 1
        let stonk_count = {}
        for(let i = 0; i < reps; i++){
            let new_stonk_data = await iterate(stonk_symbols)
            let new_stonk_count = new_stonk_data.stonk_count

            //We are not using these to calculate store at the moment but we could
            let new_favorites = new_stonk_data.stonk_tweet_favorites
            let new_replies = new_stonk_data.stonk_tweet_replies
            let new_retweets = new_stonk_count.stonk_tweet_retweets

            stonk_symbols.forEach(symbol=>{
                let old_count = stonk_count[symbol] ? stonk_count[symbol] : 0
                let new_count = new_stonk_count[symbol] ? new_stonk_count[symbol] : 0
                stonk_count[symbol] = old_count + new_count
            })
        }
        stonks.forEach(stonk=>{ //update stonks in database
            let symbol = stonk.symbol
            let stonkometer = stonk_count[symbol] ? (stonk_count[symbol]/reps) * 10  : 0// For now the stonkometer will just be the word count times 10
            stonkometer = (stonkometer + stonk.stonkometer)/2 
            stonkometer = stonkometer > 100? 100 : stonkometer // It will not go past 100
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
    let stonk_tweet_replies = {}
    let stonk_tweet_favorites = {}
    let stonk_tweet_retweets = {}
    for(d in data){ // For each tweet, look for each of the symbols. Whenever they match, increase its count
        let tweet = data[d]
        let text = tweet.text
        let favorites = tweet.favorite_count
        let replies = tweet.reply_count
        let retweets = tweet.retweet_count
        for(s in stonk_symbols){
            let symbol = stonk_symbols[s]
            let regex_string = ".*" + symbol
            let regex = new RegExp(regex_string, 'i')
            let match = text.search(regex)
            if(match > -1){
                if(stonk_count[symbol]) stonk_count[symbol]++
                else stonk_count[symbol] = 1
                if(favorites && stonk_tweet_favorites[symbol]) stonk_tweet_favorites[symbol] = stonk_tweet_favorites[symbol] + favorites
                else stonk_tweet_favorites[symbol] = favorites
                if(replies && stonk_tweet_replies[symbol]) stonk_tweet_replies[symbol] = stonk_tweet_replies[symbol] + replies
                else stonk_tweet_replies = replies
                if(retweets && stonk_tweet_retweets[symbol]) stonk_tweet_retweets[symbol] = stonk_tweet_retweets[symbol] + retweets
            }
        }
    }
    return {stonk_count, stonk_tweet_replies, stonk_tweet_favorites, stonk_tweet_retweets} 
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