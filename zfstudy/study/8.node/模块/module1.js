let path = require('path');
let fs = require('fs')
let vm = require('vm')

function Module(id) { 
  this.id = id
  this.exports = {}
}
Module._extensions = {
  '.js'(module){
    let arr = ['(function(exports,module,require,__filename,__dirname){','})']
    let str = fs.readFileSync(module.id,'utf8')
    let scrpt = arr[0] + str + arr[1]
    vm.runInThisContext(scrpt).call(module.exports,module.exports,module,req)

    
  },
  '.json'(module){
    module.exports = JSON.parse(fs.readFileSync(module.id,'utf8'))
  },
}
//文件解析
Module._resolveFilename = function(filename){
  let r = path.join(__dirname,filename)
  // console.log(r)
  if(!path.extname(r)){
    //加后缀
    let key = Object.keys(Module._extensions)
    for(let i = 0; i<key.length;i++){
      try {
        let ps = r + key[i]
        fs.accessSync(ps)
        return ps
      } catch (error) {
        // console.log('路径不对')
      }
    }
  }
}

Module._load = function (filename) {
  // 获取文件路径
  let absPath = Module._resolveFilename(filename)
  // console.log(p)
  let module = new Module(absPath)
  // 获取内容
  let s = path.extname(module.id)
  Module._extensions[s](module)
  return module.exports
}

function req(filename){
 return Module._load(filename)
}

let a = req('./user1')


console.log(a)