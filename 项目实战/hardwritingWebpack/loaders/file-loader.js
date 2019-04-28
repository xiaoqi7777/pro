let loaderUtils = require('loader-utils')

// 他要导出一个路径
function loader(source){
  console.log('source',source)
  // 根据图片格式生成图片路径
  let filename = loaderUtils.interpolateName(this,'[hash].[ext]',{content:source})
  this.emitFile(filename,source);// 发射文件
  return `module.exports = "${filename}"`
}

loader.raw = true // 将源码转换成二进制

module.exports = loader