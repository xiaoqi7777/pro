## 1、安装 npm install @babel/core  @babel/cli

## 2、安装 npm insall @babel/preset-env  作用把ES6 转换成 ES5
#      当前 创建一个 .babelrc 配置文件

## 3、插件 @babel/plugin-proposal-class-properties 属性解析器 将类进行转换  
    可以在类中 写  a=1
      不用写constructor(){a:1}
    用法
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose":false
      }
    ]

# 脚本 "dev":"babel bable.js -o new.js -w"
  用 babel 编译当前的bable.js 
  -o输出 成 new.js文件
  -w监听不用手动  