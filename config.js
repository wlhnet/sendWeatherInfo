// 用户相关信息配置
const config = {
    APP_ID: "123abc",
    APP_SECRET: "123abc",
    CITY: "长沙",
    START_DATE: "2022-08-22",
    BIRTHDAY1: "NL/11-01",
    BIRTHDAY2: "NL/11-01",
    USER_ID: "123abc",
    TEMPLATE_ID: "123abc",
}
module.exports = {
    ...config,
    FLAG: false // 标识是否需要从config导入配置
}

/* 数据源格式说明
{
    APP_ID: "String",
    APP_SECRET: "String",
    CITY: "String", // 地级市（如："长沙"）
    START_DATE: "xxxx-xx-xx",
    BIRTHDAY1: "NL/xx-xx", // 如果想填农历生日则用 "NL/xx-xx" 格式（如："NL/11-01"）
    BIRTHDAY2: "xx-xx",
    USER_ID: "String",
    TEMPLATE_ID: "String",
}
*/
