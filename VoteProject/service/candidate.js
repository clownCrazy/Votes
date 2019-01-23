let Candidate = require('../model/candidate');
let config = require('../config');
let User = require('../model/user');
let num = require('../utils/candidateNumber');

/**
 * 判定候选人是否已存在
 * @param candidate<Objct>
 * @returns {Promise<void>}
 */
async function isCandidateExist(candidate) {
    let res = await Candidate.findOne({candidate:candidate.candidate});
    if (res) {
        throw Error(`名称为${candidate.candidate}的侯选人已经存在`)
    }
};
async function noCandidateExist(candidate) {
    let res = await Candidate.findOne({candidate:candidate.candidate});
    if (!res) {
        throw Error(`名称为${candidate.candidate}的候选人不存在`)
    }
};

/**
 * 添加候选人
 * @param candidate <Object>
 * @returns {Promise<*>}
 */
async function addCandidate(candidate) {
    await isCandidateExist(candidate);
    let res = await Candidate.create({candidate: candidate.candidate});
    return res;
};

/**
 * 查找已经存在的所有候选人
 * @returns {Promise<*>}
 */
async function findCandidateAll(){
    let res = await Candidate.find();
    return res;
}

/**
 * 按条件查找已经存在的单个候选人
 * @param data <String>
 * @returns {Promise<*>}
 */
async function findCandidateOne(data){
    await noCandidateExist(data);
    let res = await Candidate.findOne({candidate:data.candidate});
    return res;
};
/**
 * 删除候选人
 * @param data <String>
 * @returns {Promise<void>}
 */
async function deleteCandidate(data){
    let res = await Candidate.deleteOne({_id:data});
    if (res.n<1) {
        throw Error(`名称为${email}的用户删除失败`)
    };
};
/**
 * 用户给候选人投票
 * @param votes <object> 例如:{votes:'xieqian',candidate:'谢乾'}
 * @returns {Promise<void>}
 */
async function votesCandidate(votes){
    /**
     * 验证是否为注册用户,候选人是否存在,投票是否开启
     */
    let res = await User.findOne({user:votes.user});
    if (!res) {
        throw Error(`此用户未注册!`)
    };
    let rescandidate = await Candidate.findOne({candidate:votes.candidate});
    if (!rescandidate) {
        throw Error(`名称为${votes.candidate}的侯选人不存在或未开启投票`)
    };
    if (rescandidate.status === false) {
        throw Error(`名称为${votes.candidate}的侯选人不存在或未开启投票`)
    };
    let array = rescandidate.votes;
    /**
     *验证候选人数是否达标,及每个用户投票上限
     */
    let number = await num(votes);
    if (number.candidateNum < 2){
        throw Error("候选人少于两人,暂时不能进行投票");
    } ;
    if (number.candidateNum >= 10){
        if (number.votesNum >= number.candidateNum*0.2){
            throw Error(`投票次数已达上限!`);
        };
        let push = array.push(votes.user);
        let result = await Candidate.updateOne({candidate:votes.candidate},{votes: array , number: push});
        if (result.n!==1){
            throw Error("投票失败")
        }
    }else{
        if (number.votesNum >= 1) {
            throw Error(`投票次数已达上限!`);
        };
        let push = array.push(votes.user);
        let result = await Candidate.updateOne({candidate:votes.candidate},{votes: array , number: push});
        if (result.n!==1){
            throw Error("投票失败")
        }
    };
    let rescand = await Candidate.findOne({candidate:votes.candidate});
    return rescand;
};

module.exports = {
    addCandidate,
    votesCandidate,
    deleteCandidate,
    findCandidateAll,
    findCandidateOne
};