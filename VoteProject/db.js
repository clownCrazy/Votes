let config = require('./config');
let mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1/${config.DB}`);

let db = mongoose.connection;

db.on('erreor',(err)=>{
    console.log(err);
});

db.on('open', () => {
    console.log('连接成功');
});
