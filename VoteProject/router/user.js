let router = require('express').Router();
let votesService = require('../service/user');


/**
 * 注册用户的单个查找
 */
router.get('/:user',async (req,res)=>{
    let votes = await votesService.getVotes(req.params.user);
    res.success(votes);
});
/**
 * 注册用户的单个删除
 */
router.delete('/:user',async (req,res)=>{

    await votesService.deleteVotes(req.params.user);
    res.success("删除成功")
});
/**
 * 新用户注册
 */
router.post('/register',async (req,res)=>{
    let votes = await votesService.addVotes(req.body);
    res.success(votes);

});
/**
 * 用户的登陆
 */
router.post('/login',async (req,res)=>{
    let token = await votesService.loginVotes(req.body);
    res.success({
        token:token
    });
});
module.exports = router;