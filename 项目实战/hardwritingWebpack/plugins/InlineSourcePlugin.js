// 把外链的标签 变成内联的标签
const HtmlWebpackPlugin = require('html-webpack-plugin')
class InlineSourcePlugin{
  constructor(match){
    this.match = match;//正则
  }
  progressTage(tag,compilation){// 处理某一个数据
    let newTag,url;
    if(tag.tagName === 'link' && this.reg.test(tag.attributes.href)){
      newTag= {
        tagName:'style'
      }
      url = tag.attributes.href
    }
    if(tag.tagName === 'scfript' && this.reg.test(tag.attributes.src)){
      newTag= {
        tagName:'scfript'
      }
      url = tag.attributes.src
    }
    if(url){
      newTag.innerHTML = compilation.assets[url].source();//文件的内容放到innerHTML属性上面
      delete compilation.assets[url];// 删除掉原来应生成的资源
      return newTag
    }
    return tag;
  }
  progressTages(){// 处理引入标签的数据
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach(headTag => {
      headTags.push(this.progressTage(headTag,compilation));
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.progressTage(bodyTag,compilation));
    });
    return {...data, headTags, bodyTags}
  }
  apply(compiler){
    // 要通过webpackPlugin来实现这个功能
    compiler.hooks.compilation.tap('MyPlugin',(compilation)=>{
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync
      ('alterPlugin',(data,cb)=>{
        data = this.progressTages(data);
        cb(null,data)
      })     
    })
  }
}