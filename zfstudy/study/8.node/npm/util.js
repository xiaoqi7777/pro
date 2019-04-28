


let util = require('util') //工具方法

// let fs = require('fs')
// 将回调的方式转化promise
// let read = util.promisify(fs.readFile)
// read('test.js','utf8',(err,data)=>{
//   console.log('1',data)
// })

//mz 这个模块会自动把node的模块转化成promise的形式
// 要安装
// let fs = require('mz/fs')
// fs.readFile('test.js','utf8').then(data=>{
//   console.log('data',data)
// })

// 继承的方法 node中有大量的继承 构造函数
/*
  Child.prototype.__proto__ = parent.prototype
  Object.create()
  Object.setPrototypeOf(Child.prototype,parent.prototype)
*/

util.inherits('子','父');  //继承原型上的属性 公有属性