require('../db');
let sendEmail = require('../service/emailCode');
let email = require('../model/verifyEmail');
async function testEmail() {
    await sendEmail({
        user:"crazyClown",
        email:"crazyclown520@outlook.com"
    })

}
testEmail();