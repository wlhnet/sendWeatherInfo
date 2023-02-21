// 导入请求方法
const { syncRequest } = require('./request')
// 导入公历、农历互转方法
const { solarTOlunar, lunarTOsolar } =  require('./calendarFormat')

// 返回今天的年月日 (return type: Object)
exports.getToday = function() {
    const year = new Date(Date.now()).getFullYear()
    const month = new Date(Date.now()).getMonth()+1
    const day = new Date(Date.now()).getDate()
    return {
        format1: `${year}年${month}月${day}日`,
        format2: `${year}-${month}-${day}`
    }
}

// 返回今天星期几 (return type: String)
exports.getWeek = function() {
    const weekArr = ['日', '一', '二', '三', '四', '五', '六']
    let week = new Date(Date.now()).getDay()
    return `星期${weekArr[week]}`
}

// 请求随机语录-彩虹屁 (return type: String)
exports.getWords = function() {
    let res = syncRequest("https://api.shadiao.pro/chp", 'get')
    return res.data.text
}

// 请求天气信息 (return type: Object)
exports.getWeather = function(city = '长沙') {
    const cityURI =encodeURI(city); //city为中文需要转义
    let reqUrl = `https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=${cityURI}`
    let {data} = syncRequest(reqUrl, 'get')
    let weather = data[0]
    return {
        weather: weather.wea, 
        temperature: weather.tem + "℃", 
        temperature_low: weather.tem2 + "℃", 
        temperature_high: weather.tem1 + "℃"
    }
}

// 返回随机16进制颜色 (return type: String)
exports.getRandomColor = function() {
    let str = Math.floor(Math.random() * 16777216).toString(16);
    while (str.length < 6) {
        str = '0' + str;
    }
    return '#' + str;
}

// 返回现在距离指定时间的天数 (return type: Number)
exports.handleDate = function(startDateStr = '2022-10-01', endDateStr = '2022-11-01') {
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

// 返回距离生日天数 (return type: Number)
// isLunar 是否为农历生日，默认值：false
exports.getBirthday = function (birthday = "11-01", isLunar = false) {
    // 根据 birthday 参数确定是否为农历生日
    if (birthday.split('/')[1]) {
        birthday = birthday.split('/')[1];
        isLunar = true;
    }
    let nowDay = new Date(Date.now()); // 当前时间戳
    let nowYear = new Date(Date.now()).getFullYear(); // 当前年份
    let solar = lunarTOsolar(nowYear, birthday.split('-')[0], birthday.split('-')[1] ) // 将农历生日转成当前年份农历对应的公历日期
    let solarStr = nowYear + "-" + solar.cMonth + "-" + solar.cDay // "xxxx-xx-xx"
    let birth = isLunar ? solarStr : nowYear + "-" + birthday; // birth: "xxxx-xx-xx"

    if (birthday && nowDay) {
        let separator = "-";
        let birthArr = birth.substring(0, 10).split(separator);
        let birthTime = new Date(birthArr[0], birthArr[1] - 1, birthArr[2]);
        let result = parseInt(Math.abs(birthTime - nowDay) / (1000 * 60 * 60 * 24));
        // 生日没过
        if (birthTime - nowDay > 0)  return result > 0 ? result : '不足1';
        // 生日过了
        birthTime = new Date(birthArr[0] + 1, birthArr[1] - 1, birthArr[2]);
        result = parseInt(Math.abs(birthTime - nowDay) / (1000 * 60 * 60 * 24));
        return result > 0 ? result : '不足1' ;
    }
}
