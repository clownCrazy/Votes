let router = require('express').Router();
let votesIO = require('../service/votesIO');

//投票的开启和关闭
router.put('/',async (req,res) => {

    console.log(req.body)
    let status = await votesIO(req.body);
    if (status === 'true') {
        res.success("开启投票!")
    }else{
        res.success("关闭投票!")
    };

});

module.exports = router;