/*
  ssr
    1、客户端渲染不利于seo搜索引擎优化
    2、服务端渲染是可以被爬虫抓取的,客户端异步渲染是很难爬虫抓取到的
    3、SSR直接将HTML字符串传递给浏览器,大大加快了首屏加载时间
    4、SSR占用更多的CPU 和内存资源
    5、一些常用的浏览器API可能无法正常使用
    6、在vue中只持beforeCreate和created两个生命周期
  安装
  yarn add express vue vue-server-renderer


  webpack按照
  yarn add webpack webpack-cli webpack-dev-server babel-loader @babel/preset-env vue vue-template-compiler vue-loader
  vue-style-loader css-loader html-webpack-plugin webpack-merge 

  webpack  webpack-cli  要按这两个 webpack-dev-server 这个启动服务
  babel-loader(找js语法) @babel/preset-env(插件 将es6变成es5) 处理js
  vue vue-template-compile vue-loader(处理模块)
  vue-style-loader 支持服务端渲染 css-loader处理样式
  html-webpack-plugin 处理html
  webpack-merge 合并wenpack配置

  @babel/core

  启动 npx webpack-dev-server 






*/