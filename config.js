const config = {
    APP_ID: "wx19338547890d2293",
    APP_SECRET: "fe3db78218ea30b029945052bbd61c15",
    CITY: "长沙", // 地级市（如："长沙"）
    START_DATE: "2022-09-10",
    BIRTHDAY1: "10-27",
    BIRTHDAY2: "11-01",
    USER_ID: "oOOM16JDzd0AGL9JpGUlQSJQCsIg",
    TEMPLATE_ID: "CNKmWX1iQYh1A1xxS7mLctqeBIv5fM50zxgecVDs5jA",
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
    BIRTHDAY1: "xx-xx",
    BIRTHDAY2: "xx-xx",
    USER_ID: "String",
    TEMPLATE_ID: "String",
}
*/
