// obj  深拷贝
function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = deepCopy(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
// let obj = {
//     str: 'a',//true
//     number: 1,//true
//     arr: ["1", "2"],//true
//     isTrue: true,//true
//     isNaN: NaN,//fasle
//     isUndefined: undefined,//fasle
//     func: function () { return 1 },//fasle
// }
// let obj2 = deepCopy(obj)
// console.log(obj2)


// 获取当前url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) return decodeURI(r[2]); return null;
}
// www.baidu.com?id=2
// console.log(getUrlParam('id')) // 2


// 时间格式化
function format(date, format) {
    date = new Date(date)
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'f+': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, date.getFullYear() + '').substr(4 - RegExp.$1.length) }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) { format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return format
}
// console.log(format(new Date(),'yyyy/MM/dd HH:mm:ss'))

