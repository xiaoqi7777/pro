console.log('x')

// require('./index.less')

// 将1.js 导入给inline 处理 inline loader不会每个文件都处理
// -! 不会让文件 在去通过pre + normal loader来处理了
// ! 没有normal
// !! 上面都不要 只要inline 来处理
// let a = require('!!inline!./1.js')
// loader 默认是由两部分组成 pitch normal

// import p from '../1.jpeg'
// let img = document.createElement('img')
// img.src = p;
// document.body.appendChild(img)