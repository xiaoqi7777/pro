let moment = require('moment');
moment.locale('zh-cn');
// exports 上的属性会被合并到helper对象上
// 在模板里面也可以直接调用
exports.fromNow = dateTime => moment(dateTime).fromNow()

exports.money = function(amount){
  
}