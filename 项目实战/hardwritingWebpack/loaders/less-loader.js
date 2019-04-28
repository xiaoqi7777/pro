// less 模块
let less = require('less');
function loader(source){
  let css;
  // 转换的过程,同步 
  less.render(source,(err,output)=>{
    css = output.css
  });
  return css
}
module.exports = loader