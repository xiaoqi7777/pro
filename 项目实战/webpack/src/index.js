// import $ from 'jquery';

let a = require('./1')
console.log('a',a)

let button = document.createElement('button');
button.innerHTML = 'hello';
button.addEventListener('click',()=>{
  // es6 草案中的语法 jsonp实现动态加载文件
  import('./source.js').then(data=>{
    console.log(data)
  })
})

document.body.appendChild(button)

//  @babel/plugin-syntax-dynamic-import
