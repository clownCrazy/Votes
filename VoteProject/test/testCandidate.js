require('../db');
let candidate = require('../service/candidate');
let result = require('../model/candidate');

//添加候选人
async function testAdd() {

    let res = await candidate.addCandidate("马云");
    console.log(res);
};
//用户投票测试
async function testVotes(){

    let votes = {
        candidate:"谢乾",
        votes:"867402511@qq.com"
    };
    await candidate.votesCandidate(votes);
    let res = await result.findOne({candidate: votes.candidate});
    console.log(res)

};

// testAdd();
testVotes();