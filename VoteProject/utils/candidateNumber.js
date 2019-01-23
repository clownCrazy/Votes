let Candidate = require('../model/candidate');


/**
 * 返回候选人的个数及投票人的票数
 * @param votes {candidate:"张三",votes:"userName"}
 * @returns {Promise<{candidateNum: *, votesNum: number}>}
 */
async function num(votes) {
    let res = await Candidate.find();
    let result = await Candidate.findOne({candidate: votes.candidate});
    let array = result.votes;
    let a = 0;
    let number = 0;
    for (a ; a < array.length ; a++){
        if (array[a] === votes.user){
            number++;
        }
    }
    return {
        candidateNum:res.length,
        votesNum:number
    };
}

module.exports = num;