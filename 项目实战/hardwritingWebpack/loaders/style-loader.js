let loaderUtils = require('loader-utils')

function loader(source){ //source less-loader转换后的结果
  //最终的loader需要 返回一个js脚本的字符串
  let str = `
  let style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(source)}
  document.head.appendChild(style)
  `
  return str
}
// 在style-loader 上写pitch
loader.pitch = function(remainingRequest){ // 剩余的请求
  console.log('1jin lai l ',loaderUtils.stringifyRequest(this,
    '!!' + remainingRequest))
  // remainingRequest => 剩余的 less-loader!css-loader!./index.less 
  let str = `
  let style = document.createElement('style');
  style.innerHTML = require(${loaderUtils.stringifyRequest(this,
  '!!' + remainingRequest)})
  document.head.appendChild(style)
  `
  return str;
}
module.exports = loader