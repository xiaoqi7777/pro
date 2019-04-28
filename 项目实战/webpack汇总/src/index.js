
// 引入图片的方式
// import $ from 'jquery';
// import $ from 'expose-loader?$!jquery';

// 把$ 暴露在window属性上  expose-loader
// console.log('111111123asdasdsadas')





/*
js中引入
background Url
<img src=''>
*/
// import './style'
// import 'bootstrap'
// import qq from './1.jpg' //会自动创建一个md5戳的文件
// console.log(qq)
// let img  = new Image();
// img.src = qq
// img.style.width = '100px'
// img.style.height = '100px'
// document.body.appendChild(img)


// let url = '';
// if(PRODUCTION == 'dev'){
  
//   url = 'http://www'
// }else{
//   url = 'http:localhost:8080'
// }
// console.log(url,PRODUCTION)


import React from 'react';
import ReactDom from 'react-dom';
// 第一 先把这个模块 抽离出来 reac react-dom 拿出来 先打包好

ReactDom.render(<div>123</div>,window.root)