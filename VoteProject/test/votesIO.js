require('../db');
let testIO = require('../service/votesIO');
let candidate = require('../model/candidate');


async function testcandidateIO() {
    let votes = {
        candidate:"谢乾",
        status: true
    };
    await testIO(votes);
    console.log(await candidate.findOne({candidate:votes.candidate}));
};
testcandidateIO()