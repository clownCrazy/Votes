require('../db');
let num = require('../utils/candidateNumber');

async function testNum() {
    let votes = {
        candidate:"马云",
        votes:"123"
    };
    let res = await num(votes);
    console.log(res)
}
testNum()