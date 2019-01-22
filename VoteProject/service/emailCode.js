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
async function sendEmail(votes){
    let resEmail = await User.findOne({email:votes.email});
    let again = await Verify.findOne({email:votes.email});
    if (resEmail) {
        throw Error(`邮件已经注册`)
    };
    if (!again) {
    let code = await createSixNum();
    let mail = {
        from: config.MailAccount.user,
        to: votes.email,
        subject: "邮件注册码",
        text: code
    };
    let emailCode = code;
    await nodemail(mail);
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
        await nodemail(mail);
        let result = await Verify.updateOne({_id:again._id},{code:reemailCode,created:Date.now()});
        if (result.n!==1){
            throw Error("跟新失败")
        }
    };
};

module.exports = sendEmail;
