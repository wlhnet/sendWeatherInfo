/*
    author: lehiwang
    date: 2022-08-22
*/
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/*
    封装XMLHttpRequest同步请求, 
    异步请求会导致函数返回undefined，或者其他错误
*/
module.exports.syncRequest = function(url, type, data=null) {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url, false); // 第三个参数为是否开启异步请求
    xhr.send(data);
    return JSON.parse(xhr.responseText);
}