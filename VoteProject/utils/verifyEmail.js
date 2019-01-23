let nodemailer = require('nodemailer');
let config = require('../config');
/**
 * 邮件注册发送配置
 */
let transport = nodemailer.createTransport({
    host: 'smtp.163.com', //163 smtp服务器地址
    secureConnection: false, //是否使用安全连接，对https协议的
    port: 25, //163 smtp邮件服务所占用的端口
    auth: {
        user: config.MailAccount.user,//开启SMTP的邮箱，有用发送邮件
        pass: config.MailAccount.pass//授权码
    }
});
module.exports = function (mail) {
    transport.sendMail(mail,async function (error,info) {
        if (error){
            return console.log(error);
        }
            return console.log('mail sent',info.response)
    })
}
