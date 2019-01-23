require('../db');
let testIO = require('../service/votesIO');
let candidate = require('../model/candidate');


async function testcandidateIO() {
    let votes = {
        candidate:"谢乾",
        status: true
    };
    let status = await testIO(votes);
    console.log(await candidate.findOne({candidate:votes.candidate}));
    console.log(typeof status);
};
testcandidateIO()