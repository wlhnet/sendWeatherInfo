/*
    author: lehiwang
    date: 2022-08-22
    describe: 微信测试号推送消息
*/
const {syncRequest} = require('../utils/request')
module.exports.getToken = function(APP_ID, APP_SECRET) {
    const getUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`
    let access_token = syncRequest(getUrl, 'get')
    return access_token.access_token
}

/* 
    状态码说明文档及access_token的有效时间：
    https://developers.weixin.qq.com/doc/offiaccount/WeChat_Invoice/Nontax_Bill/API_list.html#1.1%20%E8%8E%B7%E5%8F%96access_token
*/
