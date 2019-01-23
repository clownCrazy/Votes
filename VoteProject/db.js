let config = require('./config');
let mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1/${config.DB}`,{useNewUrlParser:true}, function(err){
    if(err){
        console.log('Connection Error:' + err)
    }else{
        console.log('Connection success!') }
});

// let db = mongoose.connection;

// db.on('erreor',(err)=>{
//     console.log(err);
// });
//
// db.on('open', () => {
//     console.log('连接成功');
// });
