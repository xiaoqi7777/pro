
class FileListPlugin{
  constructor({filename}){
    this.filename = filename
  }
  apply(compiler){
    // 文件已经准备好了 要进行发射
    compiler.hooks.emit.tap('compiler',(compilcation)=>{
        let assets = compilcation.assets;
        // assets 存放所有打包资源 打包之后 就是bundle.js文件和index.html文件 后面添加 就直接打包添加的文件
        // 格式[ [bundle.js,{}],[index.html,{}] ]
        let content = `## 文件名 资源大小 \r\n `
        Object.entries(assets).forEach(([filename,statObj])=>{
          content += `- ${filename}  ${statObj.size()} \r\n`
        })
        // 资源对象 下面的就是打包出来的文件
        assets[this.filename] = {
          source(){
            return content
          },
          size(){
            return content.length
          }
        }
    })
  }
}
module.exports = FileListPlugin