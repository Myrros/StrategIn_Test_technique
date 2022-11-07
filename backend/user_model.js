const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true, unique: false},
});

module.exports = mongoose.model.Users || mongoose.model('User', user_schema);