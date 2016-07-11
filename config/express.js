var config = require('../config/config'),
    exprsss= require('express'),
    morgan = require('morgan'),
    compresstion = require('compression'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    fileroute = require('./rest-route');
    

module.exports = function() {
    var app = exprsss();

//跨域问题
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });


    //开发环境
    if (process.env.NODE_ENV === 'developement') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compresstion());
    }

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        secret: '12345',
        name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: {maxAge: 80000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: true,
    }));

    //文件路由
    fileroute(app);

    //静态文件服务器
    // app.use(exprsss.static('./public'));

    return app;
}
