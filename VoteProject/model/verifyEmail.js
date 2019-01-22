let mongoose = require('mongoose');

let schema = new mongoose.Schema({
    code:{
        type:String,
    },
    user:{
        type:String
    },
    email:{
        type:String
    },
    created:{
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('emailCodes', schema);