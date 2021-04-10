const mongoose = require('mongoose')

const User= mongoose.model('User',{
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    followed:{
        type: [String]

    }
})

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

module.exports = {User, Stonk}