## 命名行工具
- 实现可以在命令行中 直接运行代码
- zf-cli install(安装)
- zf-cli config


## 安装
- yarn add  @babel/core @babel/cli @babel/preset-env @babel/polyfill

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // targets 描述您为项目支持/定位的环境。
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```
## 打包
- package.json 配置 "compile": "babel src -d dist"
- babel 编译src 输出dist文件

- 配置命名行
  - 创建babel.config.js文件 具体看文档 
  - 编译文件 命令 ./node_modules/.bin/babel src --out-dir dist
  - 或者配置package.json => "dev": "babel src -d dist"
  - "watch":"npm run dev -- --watch" 监控文件变化
- 将当前文件link到全局
  - package.json 配置
```js
  "bin": {
    "sg-cli": "./bin/www"
  },
```
- 创建bin/www
```js
#! /usr/bin/env node
require('../dist/main.js')
```
- npm link 
- 全局就有 sg-cli 命令了


- 命名行工具 作用: sg-cli --help
- npm install commander
- 配置
```js
import program from 'commander';

program.version('1.0.0','-v -version').parse(process.argv)
```