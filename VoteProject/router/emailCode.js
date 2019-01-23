let router = require('express').Router();
let emailCode = require('../service/emailCode');

// 发送邮件验证
router.post('/',async (req,res) => {

    await emailCode(req.body);
    res.success("发送邮件成功!")
});
module.exports = router;