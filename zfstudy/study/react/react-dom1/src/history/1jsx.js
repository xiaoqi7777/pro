// 导入的React名字必须大写
// import React from 'react';

// import {render} from 'react-dom';

// let ReactDom = require('react-dom');
// ReactDom.render()
// jsx 语法 jacascript + html (html加js的混写)

let React = {
  createElement(type,props,...children){
    // console.log(type,props,child)
    return {type,props,children}
  }
}

let h1 = <h1 id="hello">hello world <span>123</span></h1>;//他会用babel进行转化  

console.log('h1',h1)
//他会调用 React.createElement()方法 有一个返回值 给h1  

//React.createElement('h1',{id:'hello'},['hello world',React.createElement('span',null,'你好')])

// jsx -> React.createElement() -> vnode (对象 对象可以描述当前元素) -> 渲染到页面上
let render = (vnode,container)=>{
  if(typeof vnode === 'string') return container.appendChild(document.createTextNode(vnode))
  let {type,props,children}  = vnode;
  // console.log('--------',type,props,child)
  let ele = document.createElement(type); 
  for(let key in props){
    ele.setAttribute(key,props[key])
  }
  children.forEach(child => {
    render(child,ele)
  });
  container.appendChild(ele)
}

render(h1,window.root)