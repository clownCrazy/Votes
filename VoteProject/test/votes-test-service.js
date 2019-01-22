require('../db');

let votesService = require('../service/user');

async function testAdd() {
    let use = {
        user: "867402511@qq.com",
        password: "123456",
        email:"867402511@qq.com",
        code:"526647"
    };
    let res = await votesService.addVotes(use);
    console.log(res);
};
async function testGet(){
    let res = await votesService.getVotes("867402511@qq.com");
    console.log(res)
};
async function testDelete(){
    await votesService.deleteVotes("1313");

};
async function testLogin(){
    let use = {
        user: "867402511@qq.com",
        password: "123456",
    };
    let res = await votesService.loginVotes(use);
    console.log(res);

};
// testDelete();
testAdd()
