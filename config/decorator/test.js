TopClient = require('./topClient').TopClient;
var client = new TopClient({
    'appkey': '23399155',
    'appsecret': '19505df05ad8da803969dec3ef0d33d2',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});
client.execute('alibaba.aliqin.fc.sms.num.send', {
    'extend':'123456',
    'sms_type':'normal',
    'sms_free_sign_name':'旅烨',
    'sms_param':'{\"code\":\"1234\",\"product\":\"alidayu\"}',
    'rec_num':'13212780816',
    'sms_template_code':'SMS_11520243'
}, function(error, response) {
    if (!error) console.log(response);
    else console.log(error);
});