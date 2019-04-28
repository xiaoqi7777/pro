
let fs = require('fs')
let path = require('path')
let vm = require('vm')
function Module(filename) {
  this.id = filename
  this.exports = null
}

Module._resolveFilename = function(filename){
  let  newfile = path.join(__dirname,filename)
  console.log(path.extname(newfile))
  if(!path.extname(newfile)){
    let tian = ['.js','.json']
    for(let i=0;i<tian.length;i++){
      try {
        let dizhi = newfile + tian[i]
        fs.accessSync(dizhi)   
        return  dizhi
      } catch (error) {
        // console.log('err',error)
      }
    }
  }
}
Module._extensions ={
  '.json':(module)=>{
    module.exports = JSON.parse(fs.readFileSync(module.id)) 
  },
  '.js':(module)=>{
    let arr = ['(function(exports,module,require,__filename,__dirname){','})']
    let str = fs.readFileSync(module.id,'utf8')
    let obj = arr[0]+str+arr[1]
    vm.runInThisContext(obj).call(module,module.exports,module)
  }
}
Module._load = function (filename) {
  //文件解析
  let newPath  =  Module._resolveFilename(filename)
  //初始化
  let module = new Module(newPath);
  let p  = path.extname(module.id); 
  Module._extensions[p](module)
  return module.exports
}

function req(filename){
  return Module._load(filename)
   
}


let a = req('./user1')
console.log(a)