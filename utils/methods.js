// 导入请求方法
const { syncRequest } = require('./request')

// 返回今天的年月日 (type: Object)
exports.getToday = function() {
    const year = new Date(Date.now()).getFullYear()
    const month = new Date(Date.now()).getMonth()+1
    const day = new Date(Date.now()).getDate()
    return {
        format1: `${year}年${month}月${day}日`,
        format2: `${year}-${month}-${day}`
    }
}

// 返回今天星期几 (type: String)
exports.getWeek = function() {
    const weekArr = ['日', '一', '二', '三', '四', '五', '六']
    let week = new Date(Date.now()).getDay()
    return `星期${weekArr[week]}`
}

// 请求随机语录-彩虹屁 (type: String)
exports.getWords = function() {
    let res = syncRequest("https://api.shadiao.pro/chp", 'get')
    return res.data.text
}

// 请求天气信息 (type: Object)
exports.getWeather = function(city) {
    const cityURI =encodeURI(city); //city为中文需要转义
    let reqUrl = `https://autodev.openspeech.cn/csp/api/v2.1/weather?openId=aiuicus&clientType=android&sign=android&city=${cityURI}`
    let {data} = syncRequest(reqUrl, 'get')
    let weather = data.list[0]
    return {
        weather: weather.weather, 
        temperature: weather.temp + "℃", 
        temperature_low: weather.low + "℃", 
        temperature_high: weather.high + "℃"
    }
}

// 返回随机16进制颜色 (type: String)
exports.getRandomColor = function() {
    let str = Math.floor(Math.random() * 16777216).toString(16);
    while (str.length < 6) {
        str = '0' + str;
    }
    return '#' + str;
}

// 返回现在距离指定时间的天数 (type: Number)
exports.handleDate = function(startDateStr, endDateStr) {
    // startDateStr、endDateStr："xxxx-xx-xx"
    if(startDateStr && endDateStr) {
        let separator = "-" //日期分隔符
        let startArr = startDateStr.substring(0, 10).split(separator)
        let endStrArr = endDateStr.substring(0, 10).split(separator)
        let startTime = new Date(startArr[0], startArr[1]-1, startArr[2])
        let endTime = new Date(endStrArr[0], endStrArr[1]-1, endStrArr[2])
        return parseInt(Math.abs(startTime-endTime) / (1000 * 60 * 60 * 24))
    }
}

// 返回距离生日天数 (type: Number)
exports.getBirthday = function(birthday) {
    let nowDay = new Date(Date.now()) // 当前时间戳
    let nowYear = new Date(Date.now()).getFullYear() // 当前年份
    let birth = nowYear + '-' + birthday // 生日："xx-xx"
    if(birthday && nowDay) {
        let separator = "-";
        let birthArr = birth.substring(0, 10).split(separator)
        let birthTime = new Date(birthArr[0], birthArr[1]-1, birthArr[2])
        // 生日没过
        if(birthTime - nowDay > 0 ) return parseInt(Math.abs(birthTime-nowDay) / (1000 * 60 * 60 * 24))
        // 生日过了
        birthTime = new Date(birthArr[0] + 1, birthArr[1]-1, birthArr[2])
        return parseInt(Math.abs(birthTime-nowDay) / (1000 * 60 * 60 * 24))
    } 
}
