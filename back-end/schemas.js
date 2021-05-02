const mongoose = require('mongoose')

const Stonk = mongoose.model('Stonk',{
    name:{
        type: String
    },
    symbol:{
        type: String,
        required: true,
    },
    stonkometer:{
        type: Number,
    },
    openPrice:{
        type: Number,
        required: true
    },
    highPrice:{
        type: Number,
        required: true
    },
    lowPrice:{
        type: Number,
        required: true
    },
    currentPrice:{
        type: Number,
        required: true
    }
})

const Tweet = mongoose.model('Tweet',{
    symbol:{
        type: String,
        required: true
    },
    mentions:{
        type: Number,
        required: true
    },
    favorites:{
        type: Number,
        required: true
    },
    likes:{
        type: Number,
        required: true
    },
    retweets:{
        type: Number,
        required: true
    }

})

module.exports = {Stonk, Tweet}