/*
    author: lehiwang
    date: 2022-08-22
    describe: 微信测试号推送消息
*/
const {syncRequest} = require('../utils/request')
module.exports.sendMessage = function(token, user_id, template_id, data) {
    let reqJson = {
        touser: user_id,
        template_id: template_id,
        topcolor: "#FF0000",
        data
    }
    // 一定要是JSON格式
    const jsonStr = JSON.stringify(reqJson)
    const postUrl = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`
    if(token) {
        let result = syncRequest(postUrl, 'post', jsonStr)
        console.log(result)
    }
}
