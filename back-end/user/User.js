var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    email: String,
    password: String,
    followed: Array,
    age: Number,
    Gender: String,
    education_level: String,
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');