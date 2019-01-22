let User = require('../model/user');
let crypto = require('lxj-crypto');
let config = require('../config');
let verify = require('../model/verifyEmail');
/**
 *
 * @param email
 * @returns {Promise<void>}
 */
async function isVotesExist(user) {
    let res = await User.findOne({user:user});
    if (!res) {
        throw Error(`名称为${user}的用户不存在`)
    }
};
//获取用户
async function getVotes(user) {
    let res = await User.findOne({user:user}).select("-password");
    if (!res) {
        throw Error(`名称为${user}的用户不存在`)
    }
    return res;
};

//删除用户
async function deleteVotes(user) {
    await isVotesExist(user);
    let res = await User.deleteOne({user:user});
    if (res.n<1) {
        throw Error(`名称为${email}的用户删除失败`)
    };
};

//注册
async function addVotes(votes) {
    let res = await User.findOne({user:votes.user});
    let resCode = await verify.findOne({email:votes.email,code: votes.code});
    let nowDate = null;
    let result = {};
    if (res) {
        throw Error(`名称为${votes.user}的用户已经存在`)
    };
    //加密
    votes.password = crypto.sha1Hmac(votes.password, votes.user);
    votes.role = 0;
    votes.created = Date.now();

    if (resCode){
        nowDate = (new Date()).getTime() - resCode.created;
    };
    console.log(nowDate)
    if(resCode && nowDate < 60000) {
        result = await User.create(votes);
        result.password = '';
        return result;
    }else {
        return "验证码已失效或输入错误,请输入或再次发送!";
    };

};

//登陆
async function loginVotes(votes){
    votes.password = crypto.sha1Hmac(votes.password,votes.user);

    let res = await User.findOne({user: votes.user, password: votes.password});
    if (!res) {
        throw Error("用户名或密码错误");
    };
    //token生成,返回
    let tokenData = {
        user:votes.user,
        expire:Date.now() + config.TokenExpire
    };
    let token = crypto.aesEncrypt(JSON.stringify(tokenData), config.TokenKey);
    return token;
};

module.exports = {
    getVotes,
    deleteVotes,
    addVotes,
    loginVotes
};