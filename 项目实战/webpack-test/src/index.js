// import './index.css';
// import React from 'react';
// import ReactDom from 'react-dom';
// // 第一 先把这个模块 抽离出来 reac react-dom 拿出来 先打包好

// ReactDom.render(<div>123</div>,window.root)

// import qq from './1.jpg';
// console.log(qq)
// let img  = new Image();
// img.src = qq
// img.style.width = '100px'
// img.style.height = '100px'
// document.body.appendChild(img)

// let xhr = new XMLHttpRequest();
// xhr.open('get','/api/user',true);
// xhr.onload = function () { 
//   console.log(xhr.response)
// }
// xhr.send()
// console.log('123')
// console.log(PRODUCTION)
// console.log(FLAG,EXPRESSION)

// import moment from 'moment'
// //webpack 配置不引入语言包 需要手动引入
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')
// console.log(moment().fromNow())

// import './a.js'
// import './b.js'

// console.log('index.js')

btn.addEventListener('click',function(){
  // 动态加载js import(); 草案中
  import('./use').then(data=>{
    console.log(data.default)  
  })

})