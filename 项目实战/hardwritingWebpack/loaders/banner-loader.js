let loaderUtils = require('loader-utils')
// loaderUtils可以获取loader下面的options
let validateOptions = require('schema-utils')
// 创建骨架 用来比较传递进来的骨架是否类似
let fs = require('fs')
function loader(source){
  // 是否开启缓存
  this.cacheable(false)
   let options =  loaderUtils.getOptions(this)
   // 异步用this.async返回 否则直接用return
   let cb = this.async()
   let schema = {
     type:'object',
     properties:{
       text:{
         type:'string',
       },
       filename:{
         type:'string'
       }
     }
   }
   validateOptions(schema,options,'banner-loader')
   if(options.filename){
     // 自动添加文件依赖  webapck开启watch:true 作用 依赖文件变化wenpack会重新打包
     this.addDependency(options.filename)
     fs.readFile(options.filename,'utf8',(err,data)=>{
        cb(err,`/**${data}**/${source}`)
      })
    }else{
      cb(null,`/**${options.text}**/${source}`)
    }
}
module.exports = loader;
