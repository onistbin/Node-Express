# Node-Express
npm start

实现了登陆，添加，删除，更改等功能，功能还在完善


＃一、Express框架组建

/**
 * Created by wangjianbing on 16/5/6.
 */
var express = require('express');



//路由
var router = express.Router();
var subRouter = express.Router();

//中间件

function testMiddleWare(req, res, next) {
    console.log("test middleWare");
    //req.log = function(info) {
    //
    //    consoel.log(info);
    //}
    next();
}
function testMiddleWare2(req, res, next) {
    console.log("test middleWare 222222");
    //req.log = function(info) {
    //
    //    consoel.log(info);
    //}
    next();
}
router.use(testMiddleWare2);
router.get('/', function(req, res) {
    res.send("test router1");
});
router.get('/url1', function(req, res) {
    res.send("test url11");
});
subRouter.get('/', function(req, res) {
    res.send("test subRouter");
});
router.use('/subrouter', subRouter);
var app = express();
app.use(testMiddleWare);
app.get('/', function(req, res) {
    res.send("Hellw Express");
});
app.use('/router1', router);
app.listen(3000);




＃二、Express框架原理
