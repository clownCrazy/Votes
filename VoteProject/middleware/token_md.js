let crypto = require('lxj-crypto');
let user = require('../service/user');
let config = require('../config');

/**
 *  排除不需要token验证的url
 * @param url
 * @returns {boolean}
 */
function isExcludeUrl(url){
    let excludeUrls = [
        /.*\/user\/login/,
        /.*\/user\/register/
    ];
    let isExclude = false;
    excludeUrls.forEach(item => {
        if (item.test(url)) {
            isExclude = true;
        }
    })
    return isExclude;
};
module.exports = async (req,res,next) => {
    if (!isExcludeUrl(req.url)){
        //验证token是否存在
        let token = req.get('token');
        if (!token) {
            throw Error("缺少token")
        };
        let tokenData;
        try {
            //解析token是否合法
            tokenData = JSON.parse(crypto.aesDecrypt(token, config.TokenKey))
        } catch (e) {
            throw Error("token不合法!")
        };
            //验证token是否过期
        if (tokenData.expire < Date.now()){
            throw Error("token已经过期,请重新登陆!")
        };
        userData = await user.getVotes(tokenData.user);
        req.user = userData;
    } ;


    next();
};