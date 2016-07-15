var UpYun = require('upyun');
var upyun = new UpYun('lvye-ftpserver.b0.aicdn.com','lvyeyun','lvye2016','v0.api.upyun.com',{
    apiVersion: 'v2',
});

// upyun.putFile(remotePath, localFile, type, checksum, opts, callback)
upyun.usage(function(err, result) {
    //...
    console.log(result);
})