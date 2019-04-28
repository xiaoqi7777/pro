// 下载别人的包来用

// 安装第三方包 用两种方式 全局安装 本地安装

// npm install xx  -g 全局安装  只能在命令行中使用  工具类

// sudo(mac才需要添加) npm install nrm -g   nrm切换源
// nrm ls  查看源
// nrm use npm 用谁


//  npm install -g http-server 启动一个服务
//  npm root -g  安装到那个目录

// 本地安装
// npm install jquery 默认叫项目依赖  上线开发都需要
// npm install jquery -D 开发用
// npm init -y 初始化
// license 协议 MIT(最大的)开源协议

// yarn 也是一个包管理工具
// npm install yarn -g
// npm add /  npm remove

/*
  文件查找
    判断是否有相对路径 Y=>加载本地 
    N=> 是否为核心模块 Y=>加载核心
    N=> 判断是第三方模块
     
    1、尝试添加拓展名(js node json )
    2、尝试按照包开始查找 对应的目录下是否有package.json已经main的指向 
    3、尝试查找该目录下的index文件

    当前node_module下 如果有文件和JS文件 会先执行js文件
    若文件package.json 有main指向就走指向的文件 没有就找index。。。。。。。。。。。。。

    //普通情况下
    如果有文件先找文件 在找文件夹

    */

let s = require('./a')
console.log(s)