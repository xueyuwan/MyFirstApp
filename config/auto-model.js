//自动引入app/models下的所有文件的 exports.automodel={User:UserSchema};并合并到一个db对象中,并返回该对象
var path = require('path');
var fs = require('fs');

//扫描项目app/routes/下面的所有路由文件
var routesDir = path.dirname(__dirname)+'/app/models';


function createDb() {
//数据库对象,只能添加注册一张表一次
    var handler = {
        set: function (target, key, value, receiver) {
            if(key in target){
                //添加了同样的数据库
                throw new Error(`modle   ${key}  is exsiting,plearse remove it `);
            }else {
                console.log(`loadding Sechma ${key}`);
                return Reflect.set(target, key, value, receiver);
            }
        }
    };
    var db = new Proxy({}, handler);

  function loadFile(filePath) {
        var dbSechma = require(filePath);

        for(var Sechma in dbSechma){
            db[Sechma]=dbSechma[Sechma];
        }
   
  }


    var files = fs.readdirSync(routesDir);

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
                    console.log('loading model js file:'+filePath);
                    loadFile(filePath);
                }
            })
        });
    return db;

}

/**文件路由层**/
module.exports = createDb();