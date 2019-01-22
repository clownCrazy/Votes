let router = require('express').Router();
let votesService = require('../service/user');
router.get('/:email',async (req,res)=>{
    let votes = await votesService.getVotes(req.params.email);
    res.success(votes);
});

router.delete('/:email',async (req,res)=>{

    await votesService.deleteVotes(req.params.user);
    res.success("删除成功")
});

router.post('/register',async (req,res)=>{
    let votes = await votesService.addVotes(req.body);
    res.success(votes);

});

router.post('/login',async (req,res)=>{
    let token = await votesService.loginVotes(req.body);
    res.success({
        token:token
    });
});
module.exports = router;