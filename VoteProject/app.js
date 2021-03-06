//开启db连接
require('./db');
//引入捕获异常处理
require('express-async-errors');
let express = require('express');
//引入日志打印
let morgan = require('morgan');
let bodyParser = require('body-parser');
let config = require('./config');
let app = express();
//注册引用
app.use(morgan('combined'));
app.use(bodyParser.json());
//自定义中间件
app.use(require('./middleware/res_md'));
app.use(require('./middleware/token_md'));

//注册路由
app.use("/user", require('./router/user'));
app.use("/votesIO", require('./router/votesIO'));
app.use("/sendEmail", require('./router/emailCode'));
app.use("/candidate", require('./router/candidate'));

app.use((err,req,res,next)=>{
    res.fail(err.toString());
})
app.listen(config.PORT);