let path = require('path');
let fs = require('fs')
let vm = require('vm')
function Module(id){
  this.id = id;
  this.exports = {}
}
Module._extensions = {
  '.js'(module){//编译js的方法
    let a = fs.readFileSync(module.id,'utf8')
    let moduleWrap = ['(function(exports,module,require,__filename,__dirname){','})']
    let script = moduleWrap[0]+ a +moduleWrap[1]
    console.log(script)
        //这里注意函数参数 exports 只是 module.exports的别名(他们指向的是同一个引用地址)  
        //只修改exports的值 就说明他的引用地址变了 但是module.exports引用地址没变
        // exports = module.exports = {} 
        // 若是 exports.a = '123' 则说明指向的引用地址内容变动  module.exports 获取的值也跟着变动
        vm.runInThisContext(script).call(module.exports,module.exports,module,req)
  },
  '.json'(module){
    module.exports = JSON.parse(fs.readFileSync(module.id,'utf8')) 
  }
}

//获取当前绝对路径
Module._resolveFilename = function (filename) {
  let r = path.resolve(__dirname,filename)
  // 如果当前的路径 没有扩展名 就依次添加拓展名尝试
  if(!path.extname(r)){
    let extnames = Object.keys(Module._extensions) //['js','json']
    for(let i=0;i<extnames.length;i++){
      let p = r+extnames[i]
      try{
        fs.accessSync(p)
        console.log('p',p) //p 是我想要的结果
        return p
      }catch(e){
        console.log('不存在')
      }
        
    }
  }
}
Module._load = function(filename){ //当前需要引用的扩展名
  let absPath = Module._resolveFilename(filename)
  //创建模块
  let module = new Module(absPath);
  //加载模块
  let ext = path.extname(module.id)
  //找个方法调用完以后 module.exports就有了结果
  Module._extensions[ext](module)

  return module.exports
}
function req(id){
 return Module._load(id)
}

// 流程  1、拿到用户传入的路径，将路径解析成绝对路径，创建一个模块，根据路径加载对应的方法
//      如果是JSON 把读取的结果放到模块的exports对象上，req方法最后返回找个exports对象

let a = req('./user1') //会先找js 再找json

console.log('a',a)
console.log('a',global.b)





// 先实现一个 require方法
// Module._load 加载模块
// Module._resolveFilename解析文件 把相对路径解析成绝对路径，会添加后缀，先添加js后添加josn
// 是否有缓存 有缓存就把exports对象返回回去

//new Module 创建一个模块
//每一个模块都上有一个id代表的是当前的绝对路径  还有一个exports对象
//Module._cache 是用来缓存模块的 缓存的key是绝对路径
//module.load 加载模块
//Module._extensions 模块上扩展名的对象