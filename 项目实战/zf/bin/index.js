#! /usr/bin/env node


// 1、获取webpack.config.js 配置文件
let path = require('path');

// 2、通过当前执行命令的目录 解析除webpack.config.js 在那儿执行就在那儿找webpack.config.js
let config = require(path.resolve('webpack.config.js')) 

// 主的类 Compiler 编译
let Compiler = require('../lib/Compiler.js')

// 根据用户创建的配置文件 进行编译
let compiler = new Compiler(config)

compiler.hooks.entryOption.call()
  
compiler.run()//开始运行