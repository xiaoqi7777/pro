

//模块都是靠闭包实现的
// seajs cmd   require amd  都淘汰了
//commonjs 规范
/*  esmodule(es6里面的)
  1、如何定义模块 node中一个文件就是一个模块
  2、如何引用别人模块 require
  3、怎样导出一个模块给别人用 module.exports

  node 它靠的是文件读取
  eval 
*/
let b = 2;
let fn = `(function a() {
  let b = 1;
  console.log(b)
})()`
//内置模块  沙箱(一个单独的环境)
let vm = require('vm')
vm.runInThisContext(fn)

let fs = require('fs')

//access 访问  Sync 同步  读文件
// try {
//   fs.accessSync('test.js')
// } catch (error) {
//   console.log(error)
// }
// 把一个相对路径 转化成绝对路径
// __dirname表示当前文件所在的文件夹 绝对路径
// resolve和join 基本一样  前者遇到/ 会默认回到跟目录  后者会拼接 

// let path = require('path')
// console.log(path.resolve(__dirname ,'test.js'))
// console.log(path.join(__dirname ,'test.js'))
// console.log(path.extname('1.mid.js'))
// console.log(path.basename('1.mid.js','.js'))



// runInThisContext 在当前沙箱中执行
// fs.accessSync 判断文件是否可以访问到 没有会报错 有就正常 没有返回值
// path.resolve join extname basename

// 先实现一个 require方法
// Module._load 加载模块
// Module._resolveFilename解析文件 把相对路径解析成绝对路径，会添加后缀，先添加js后添加josn
// 是否有缓存 有缓存就把exports对象返回回去

//new Module 创建一个模块
//每一个模块都上有一个id代表的是当前的绝对路径  还有一个exports对象
//Module._cache 是用来缓存模块的 缓存的key是绝对路径
//module.load 加载模块
//Module._extensions 模块上扩展名的对象