var UpYun = require('upyun');
var upyun = new UpYun('lvye-ftpserver','lvye2016','lvye2016','v0.api.upyun.com',{
    apiVersion: 'v2',
});
var del = require('del');
try {
    upyun.putFile('config.min.js', 'c:/config.js', null, true, {}, function () {
    });
}catch (e){
    console.error(e);
}

module.exports = {
    putFile:function(remoteDir,localDir) {
        upyun.putFile(remoteDir, localDir, null, true, {}, function () {
                 del([localDir]);
        }
        )
    },
};
