let mongoose = require('mongoose');

let schema = new mongoose.Schema({
    user:{
        type:String,
        unique:true,
        required:[true,"用户名不可为空"]
    },
    password:{
        type: String,
        required: [true,"密码不可为空"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"注册邮箱不可为空"]
    },
    role:{
        type: Number,
        default: 0
    },
    created:{
        type: Date,
        default: Date.now()
    },
    code:{
        type:String,
    },
});
module.exports = mongoose.model('votes', schema);