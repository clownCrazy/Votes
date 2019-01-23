let User = require('../model/user');
let crypto = require('lxj-crypto');
let config = require('../config');
let verify = require('../model/verifyEmail');
//判定用户是否存在或注册
async function isVotesExist(user) {
    let res = await User.findOne({user:user});
    if (!res) {
        throw Error(`名称为${user}的用户不存在`)
    }
};

/**
 * 查询用户
 * @param user <String>
 * @returns {Promise<*>}
 */
async function getVotes(user) {
    let res = await User.findOne({user:user}).select("-password");
    if (!res) {
        throw Error(`名称为${user}的用户不存在`)
    }
    return res;
};

/**
 * 删除用户
 * @param user <String>
 * @returns {Promise<void>}
 */
async function deleteVotes(user) {
    await isVotesExist(user);
    let res = await User.deleteOne({user:user});
    if (res.n<1) {
        throw Error(`名称为${email}的用户删除失败`)
    };
};

/**
 * 注册功能的实现
 * @param votes <object> {user:"xieqian",email:"867402511@qq.com",password:"123456",code:"654655"}
 * @returns {Promise<string>}
 */
async function addVotes(votes) {
    let res = await User.findOne({user:votes.user});
    let resCode = await verify.findOne({email:votes.email,code: votes.code});
    let nowDate = null;
    let result = {};
    if (res) {
        throw Error(`名称为${votes.user}的用户已经存在`)
    };
    /**
     * 将用户密码进行加密
     */
    votes.password = crypto.sha1Hmac(votes.password, votes.user);
    votes.role = 0;
    votes.created = Date.now();
    /**
     * 判断验证码是否存在,并计算发送验证码到当前时间
     */
    if (resCode){
        nowDate = (new Date()).getTime() - resCode.created;
    };
    /**
     * 判断验证码是否过期
     */
    if(resCode && nowDate < 60000) {
        result = await User.create(votes);
        result.password = '';
        return result;
    }else {
        return "验证码已失效或输入错误,请输入或再次发送!";
    };

};

/**
 * 登陆验证功能的实现,并返回token
 * @param votes <object>
 * @returns {Promise<void>}
 */
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