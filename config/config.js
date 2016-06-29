//生产环境设置

module.exports = require('./env/'+process.env.NODE_ENV+'.js');