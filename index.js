/*
    author: lehiwang
    date: 2022-08-22
    describe: 微信测试号推送消息
*/
const { sendMessage } = require('./wx/index')
const { getToken } = require('./wx/getToken')
const config = require('./config') // 获取config.js文件中的对象
const secrets = process.env // 获取github中机密(secrets)对象

// 导入所需方法
const { 
    getToday, 
    getWeek, 
    getWords, 
    getWeather, 
    getRandomColor,
    handleDate,
    getBirthday,
} = require('./utils/methods')

/*
*  获取配置方法一：
*  在本地或您自己的服务器运行则采用该方式(当 config.FLAG 为 true 时)
*
*  获取配置方法二：
*  如果在github actions中运行，为了保护隐私将config中的信息存到github的机密中(当 config.FLAG 为 false 时)
*/
// config.FLAG = true //config.FLAG 默认为false
const today = getToday().format2
const start_date = config.FLAG ? config.START_DATE : secrets.START_DATE
const city = config.FLAG ? config.CITY : secrets.CITY
const birthday1 = config.FLAG ? config.BIRTHDAY1 : secrets.BIRTHDAY1
const birthday2 = config.FLAG ? config.BIRTHDAY2 : secrets.BIRTHDAY2

const app_id = config.FLAG ? config.APP_ID : secrets.APP_ID
const app_secret = config.FLAG ? config.APP_SECRET : secrets.APP_SECRET

const user_id = config.FLAG ? config.USER_ID : secrets.USER_ID
const template_id = config.FLAG ? config.TEMPLATE_ID : secrets.TEMPLATE_ID

// 提取天气信息
const {weather, temperature, temperature_low, temperature_high} = getWeather(city)

// 构造发送模板对象
let templateData = {
    today: {
        value: `${getToday().format1} ${getWeek()}`,
        color: getRandomColor()
    },
    city:{value: city},
    weather:{value: weather},
    temperature:{
        value: temperature, 
        color:"#B857B7"
    },
    temperature_low:{
        value: temperature_low, 
        color:"#4A97BF"
    },
    temperature_high:{
        value: temperature_high, 
        color:"#FF5300"
    },
    love_day:{
      value: handleDate(start_date, today),
      color: "#FF4500"
    },
    birthday_left:{
      value: getBirthday(birthday1),
      color: "#E67270"
    },
    birthday_right:{
      value: getBirthday(birthday2),
      color: "#E67270"
    },
    words:{
      value: getWords(), 
      color: getRandomColor()
     }
}
// console.log(templateData)

// 1、一定要先获取token再执行sendMessage
const token = getToken(app_id, app_secret)
// 2、推送主函数
console.log(templateData)
sendMessage(token, user_id, template_id, templateData)


/* 模板：
{{today.DATA}}

城市：{{city.DATA}}
天气：{{weather.DATA}}
当前气温：{{temperature.DATA}}
今日最低温度{{temperature_low.DATA}}，最高温度{{temperature_high.DATA}}
今天是我们在一起的第{{love_day.DATA}}天
距离你的生日还有{{birthday_left.DATA}}天
距离我的生日还有{{birthday_right.DATA}}天 

Ｏ(≧▽≦)Ｏ
{{words.DATA}}
 
微信官方模板说明文档：
https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html
 */
