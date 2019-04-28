
let loaderUtils = require('loader-utils')
let mime = require('mime')
function loader(source){
  let options = loaderUtils.getOptions(this);
  let limit = options.limit
  if(limit && limit >source.length){
    // this.resourcePath 文件路径
    return `module.exports = "data:${mime.getType(this.resourcePath)};
    base64,${source.toString('base64')}"`
  }else{
    return require('./file-loader').call(this,source)
  }
}
loader.raw = true
module.exports = loader

// base64 格式 data:image/jpeg;base64,xxxxx;