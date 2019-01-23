let router = require('express').Router();
let candidate = require('../service/candidate');

// 单次查询候选人
router.post('/find',async (req,res) =>{
    let result = await candidate.findCandidateOne(req.body);
    res.success(result);

});
//查询所有候选人
router.get('/',async (req,res) => {

    let result = await candidate.findCandidateAll();
    res.success(result);
});
//删除候选人

router.delete('/:id',async (req,res) => {

    await candidate.deleteCandidate(req.params.id);
    res.success("删除成功!");
});
//添加候选人
router.post('/add',async (req,res) => {

    let result = await candidate.addCandidate(req.body);
    res.success(result);
});
//投票
router.post('/votes',async (req,res) => {

    let result = await candidate.votesCandidate(req.body);
    res.success(result)
});



module.exports = router;