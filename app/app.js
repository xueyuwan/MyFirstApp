var path = require('path');
process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

//mongoose文件必须是app.js 中第一个引入的文件
var mongoose = require( '../config/mongoose');
var db = mongoose();
var express =  require('../config/express');
var app = express();



//文件路由
var port= 3000;


app.listen(process.env.PORT || port,function(err){
  console.log('app server runing on port:'+port);
});


module.exports = app;
