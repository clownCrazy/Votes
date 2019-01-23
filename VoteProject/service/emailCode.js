let nodemail = require('../utils/verifyEmail');
let config = require('../config');
let Verify = require('../model/verifyEmail');
let User = require('../model/user');

function createSixNum() {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

/**
 * 发送邮件验证功能
 * @param votes {user:"xieqian",email:"867402511@qq.com"}
 * @returns {Promise<void>}
 */
async function sendEmail(votes){
    let resEmail = await User.findOne({email:votes.email});
    let again = await Verify.findOne({email:votes.email});
    //判定邮箱是否为有效邮箱
    if (resEmail) {
        throw Error(`邮件已经注册`)
    };
    //判定新注册邮箱是否为第一次发送还是多次发送验证
    if (!again) {
    let code = await createSixNum();
    let mail = {
        from: config.MailAccount.user,
        to: votes.email,
        subject: "邮件注册码",
        text: code
    };
    let emailCode = code;
    //发送邮件
    await nodemail(mail);
    //储存发送信息
    let result = await Verify.create({
        user:votes.user,
        email:votes.email,
        code:emailCode
    });
    }else {
        let recode = await createSixNum();
        let mail = {
            from: config.MailAccount.user,
            to: votes.email,
            subject: "邮件注册码",
            text: recode
        };
        let reemailCode = recode;
        //发送邮件
        await nodemail(mail);
        //跟新储存信息
        let result = await Verify.updateOne({_id:again._id},{code:reemailCode,created:Date.now()});
        if (result.n!==1){
            throw Error("跟新失败")
        }
    };
};

module.exports = sendEmail;
