let mongoose = require('mongoose');

let schema = new mongoose.Schema({
    candidate:{
        type:String,
        unique:true,
        required:[true,"候选人不可为空"]
    },
    created:{
        type: Date,
        default: Date.now()
    },
    votes:{
        type:[String]
    },
    number:{
        type:Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("candidate", schema);