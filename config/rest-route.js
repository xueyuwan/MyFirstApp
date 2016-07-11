// 当前项目的routes目录的路径
var path = require('path');
var fs = require('fs');
var UserRoute = require('../app/route/Student');
var Logic = require('../app/proxy/logic/Logic')
 // UserRoute.doAction('login').bind(UserRoute,[])();


//扫描项目app/routes/下面的所有路由文件
var routesDir = path.dirname(__dirname)+'/app/route';




/**文件路由层**/
module.exports = function (app) {

    function loadFile(filePath) {
        var routeObj = require(filePath);
        if(routeObj) {
            //导出对象的platform对象,service服务,action请求
            console.log(`loading route parttern:  ${routeObj.service}/:action`);
            app.get(`/${routeObj.service}/:action`, function (req, res, next) {
             routeObj.doAction(req.params.action).bind(routeObj,req,res)();
            });

        }else{
            var errorFile =`file: ${filePath}  not export right route Object`;
            throw new Error(errorFile);
        }

    }


    fs.readdir(routesDir, function(err, files) {
        if (err) {
            console.log(err);
            return ;
        }

        files.forEach(function(path) {
            //routes目录下的文件路径
            var filePath = routesDir + "/" + path;
            fs.stat(filePath, function(err, stats) {
                if (err) {
                    return ;
                }
                if (stats.isDirectory()) {
                    //递归执行函数
                } else  {
                    //加载文件并解析
                    console.log('loading route js file:'+filePath);
                    loadFile(filePath);
                }
            })
        });
    });
    return app;
};

