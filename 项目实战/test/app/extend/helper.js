const moment=require('moment');
moment.locale('zh-cn');
exports.fromNow=dateTime => moment(new Date(dateTime)).fromNow();
exports.sum = (t1,t2) => t1+t2;