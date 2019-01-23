# Votes
简单的电子邮件注册和投票/Simple email registration and voting
项目整体文件说明

- config配置文件目录
  - index.js  默认配置文档,设置不同环境变量名称(开发环境名称和生成环境名称),根据名称不同进行默认配置切换.
  - dev.js  开发环境配置(端口设置,token设置,sendEmail设置).
  - prod.js  生产环境配置(端口设置,token设置,sendEmail设置).
- middleware   中间件封装文件目录
  - res_md.js  为res参数绑定方法success和fail
  - token_md.js  token验证
- model   存放具体数据库 ORM 模型文件

- router   统一路由,api接口
  - candidate.js   候选人的增删查改,及投票接口
  - emailCode.js  注册发送验证码接口
  - user.js   注册用户的登陆,注册,查询,删除接口
  - votesIO.j  投票的开启和关闭接口   
- service  服务层，业务逻辑代码在这一层编写，通过不同的接口获取的数据转换成统一的前端所需要的数据(数据库的增删查改及业务逻辑).
  - candidate.js  候选人的增删查改,及投票逻辑
  - emailCode.js  发送验证码逻辑及后续的验证方式
  - user.js 注册用户的登陆,注册,查询,删除,以及注册时的验证码验证逻辑
  - votesIO.j  投票的开启和关闭逻辑
- test   逻辑功能测试文件目录
- utils   封装工具文件目录
  - candidateNumber.js  返回候选人的个数(用于验证是否少于两人及多于10人的验证)及同一用户投票同一候选人的票数
  - verifyEmail.js  封装发送邮件的授权
- app.js 主项目入口文件,路由注册,中间件注册等
- package.json 项目配置文件

API接口都用PostMan测试

搭建环境

- 使用的框架和库有:
  - Express
  - mongoose
  - express-async-errors
  - morgan
  - body-parser
  - lxj-crypto
