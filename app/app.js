process.env.NODE_ENV = process.env.NODE_ENV || 'developement';
    var path = require('path');


//mongoose文件必须是app.js 中第一个引入的文件
    var mongoose = require('../config/mongoose');
    var db = mongoose();
    var express = require('../config/express');
    var app = express();
    var server = require('http').Server(app);
    //socket.io
require('./socket-io')(server);

    var port = 3000;
    server.listen(process.env.PORT || port, function (err) {
        console.log('app server runing on port:' + port);
    });
    module.exports = app;
