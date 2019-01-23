let Candidate = require('../model/candidate');

/**
 * 投票的开启和关闭
 * @param data <object> 例如:{candidate:"谢乾",status: true}
 * @returns {Promise<void>}
 */
async function votesIO(data) {

    let rescandidate = await Candidate.findOne({candidate:data.candidate});
    if (!rescandidate) {
        throw Error(`名称为${data.candidate}的侯选人不存在`)
    };

    let result = await Candidate.updateOne({candidate: data.candidate}, {status: data.status});
    if (result.n!==1){
        throw Error("开启投票失败!")
    };
};

module.exports = votesIO;