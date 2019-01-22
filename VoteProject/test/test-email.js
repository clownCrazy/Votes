require('../db');
let sendEmail = require('../service/emailCode');
let email = require('../model/verifyEmail');
async function testEmail() {
    await sendEmail({
        user:"xieqian",
        email:"867402511@qq.com"
    })

}
testEmail();