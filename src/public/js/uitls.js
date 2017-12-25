 /**
 * [根据传入的毫秒数返回对应的时间格式]
* 小于三分钟——刚刚
* 超过3分钟1小时内——分钟前
* 今天——显示小时分
* 昨天——昨天 小时分
* 超过昨天——月日时
* 去年——年月日时
 * @param {[number]} t [传入的时间]
 * @return {[string]} [计算后的时间字符串]
 * */

export function publicTime(t) {
  let tdate = new Date(t),          // 时间毫秒数
    tYear = tdate.getFullYear(),   // 返回年份
    tMonth = tdate.getMonth(),     // 返回的月份
    tDay = tdate.getDate(),        // 返回的天
    hour = tdate.getHours(),       //  小时
    minutes = tdate.getMinutes(),   // 分钟

    pmin = minutes < 10 ? '0'+minutes : minutes;

  let date = new Date(),          //   当前时间
    year = date.getFullYear(),    //  当前时间的年份
    month = date.getMonth(),      // 当前时间的月份
    day = date.getDate(),         //  当前时间的天

    dDay = day - tDay,           // 相隔的天数
    dYear = year - tYear,        // 想个的月份

    now = date.getTime(),     // 当前时间的毫秒数
    oneDay = 86400000;        //  一天的毫秒数

  let d_time = now -t;         //  相隔时间的毫秒数
  let min3 = 180000,            // 3分钟毫秒数
    one_hour = 3600000;         // 一小时的毫秒数

if(d_time < 180000) return '刚刚';
else if (d_time < 3600000) return Math.floor(d_time/60000) + '分钟前';
else if (tYear == year && tMonth == month && dDay == 0) return hour + ':' + pmin;
else if (tYear == year && tMonth == month && dDay == 1) return '昨天 ' + hour + ':' + pmin;
else if (dYear == 0) return tMonth + '月' + tDay + '日 ' + hour + ':' + pmin;
else if (dYear > 0) return tYear + '年' + tMonth + '月' + tDay + '日 ' + hour + ':' + pmin;
return '格式错误';
}

 /** 根据给的出生年日年龄
  * @param t [给的时间]
  * @return {number} [年龄]
  */

export function age(t) {
  let tdate = new Date(t),          // 时间毫秒数
    tYear = tdate.getFullYear(),   // 返回年份
    tMonth = tdate.getMonth(),     // 返回的月份
    tDay = tdate.getDate()        // 返回的天

  let date = new Date(),          //   当前时间
    year = date.getFullYear(),    //  当前时间的年份
    month = date.getMonth(),      // 当前时间的月份
    day = date.getDate()         //  当前时间的天

  let dYear = year - tYear,
    dMonth = month - tMonth,
    dDay = day - tDay;

  if(dMonth < 0) return dYear - 1;
  else if (dMonth == 0) return dDay < 0 ? dYear - 1 : dYear;
  return dYear;
}

/*test*/
// console.log('测试刚刚-',publicTime(1513956395187));
// console.log('测试小时内-',publicTime(1513956095187));
// console.log('测试一天内-',publicTime(1513951895187));
// console.log('测试昨天-',publicTime(1513865495187));
