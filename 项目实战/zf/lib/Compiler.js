// ejs 用来拼接字符串
// tapable 用来发布订阅
let path = require('path');
let fs = require('fs');
let babylon = require('babylon'); // babylon.parse(code) -> ast
let t = require('@babel/types'); // es模块需要 多.default
let traverse = require('@babel/traverse').default;
let generator = require('@babel/generator').default;
let ejs = require('ejs');
let {SyncHook} = require('tapable')

class Compiler{
  constructor(config){
    // 配置文件
    this.config = config
    // 需要获取当前执行命令的绝对路径
    this.root = process.cwd()
    // 找到配置文件中的入口
    this.entry = config.entry
    // 入口文本的id
    this.entryId;
    //所有的依赖列表
    this.modules = {},

    this.hooks = {
      entryOption: new SyncHook(),
      run: new SyncHook(),
      compile:new SyncHook(),
      afterCompile:new SyncHook(),
      afterPlugins:new SyncHook(),//插件都执行完成后调用此方法
      emit:new SyncHook(),//文件发射出来了
      done:new SyncHook()
    }

    if(Array.isArray(config.plugins)){
      config.plugins.forEach(p=>{
        // 每个插件都需要有一个 apply 方法
        p.apply(this);//每个插件都能拿到 compiler(this) 对象
      })
    }
    this.hooks.afterPlugins.call();
  }

  getSource(modulePath){//获取资源
    // 需要判断 modulePath 是否是less文件
    // 获取规则
    let rules = this.config.module.rules;//所有的规则
    let content = fs.readFileSync(modulePath,'utf8');
    for(let i=0;i<rules.length;i++){
      let rule = rules[i]
      let {test,use} = rule
      let len = use.length - 1;//默认定位到最后一个loader
      if(test.test(modulePath)){
        // 这个路径需要用loader来解析
        function normalLoader(){
          // loader 可以是一个路径
          console.log('===',use[len--])
          let loader = require(use[len--]);
          content = loader(content);
          if(len>=0){
            normalLoader();//递归来解析loader
          }
        }
        normalLoader()
      }
    }
    return content
  }
  // 创建模块
  // 第一个是绝对路径 第二个是否是主入口
  buildMoudle(modulePath,isEntry){
    // 文件源代码
    let source = this.getSource(modulePath)
    // modulePath 目前是绝对路径 path.relative在绝对路径中找相对路径
    let moduleId = './' + path.relative(this.root , modulePath)
    // console.log('==',moduleId,'-',source)
    if(isEntry){
      //如果是主模块
      this.entryId = moduleId
    }
    // AST语法解析 写一个专门的方法来解析源代码
    // 处理当前模块的父路径 path.dirname
    // sourceCode 就是转换后的代码
    let {sourceCode,dependencies} = this.parse(source,path.dirname(moduleId)) // 取到的就是./src
    this.modules[moduleId] = sourceCode;
    // 需要拿到当前文件的依赖 递归搜索依赖
    dependencies.forEach(dep=>{
      this.buildMoudle(path.join(this.root,dep))
    });
    // console.log('sourceCode',dependencies)
  }
  // yarn add babylon @babel/traverse @babel/generator @babel/types
  parse(source,parentPath){
    let ast = babylon.parse(source)
    let dependencies = [];//存放依赖关系的
    traverse(ast,{
      CallExpression(p){
        let node = p.node;
        // 找到require
        if(node.callee.name === 'require'){ //取到名字
          node.callee.name = '__webpack_require__';
          let moduleName = node.arguments[0].value;
          moduleName = moduleName + (path.extname(moduleName)?'':'.js')
          moduleName = './' + path.join(parentPath,moduleName)
          // 把依赖添加进去
          dependencies.push(moduleName)
          // 替换变量名
          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    })
    let sourceCode = generator(ast).code;
    return {sourceCode,dependencies}
    // ast 1) 转换树 2) 遍历树 3)更改书  4)输出代码
    // esprima es-travarse esCodegen(webpack用的这个) 语法转换
    // babel(babylon  @babel/traverse  @babel/types @babel/generator) 对应上面的1-4
  }
  // 开始运行
  run(){
    this.hooks.run.call()
    // 1、创建模块 需要根据当前的绝对路径
    this.hooks.compile.call()
    this.buildMoudle(path.resolve(this.root,this.entry),true);
    this.hooks.afterCompile.call()
    // console.log(this.entryId,this.modules)
    // 2、创建完后 把成功的文件写出来
    this.emitFile();//发射文件
    this.hooks.emit.call();
    this.hooks.done.call()
  }
  emitFile(){
    // 模板内容
    let content = this.getSource(path.resolve(__dirname,'temp.ejs'))
    // 
    let str = ejs.render(content,{
      modules:this.modules,
      entryId:this.entryId
    })
    // 写入打包到的文件中
    let main = path.join(this.config.output.path,this.config.output.filename);
    fs.writeFileSync(main,str)

  }
}

module.exports = Compiler