
import {createElement,render,rendderDom,Element} from './element'
import diff from './diff'
import patch from './patch'
let vertualDom = createElement('ul',{class:'list'},[
  createElement('li',{class:'item'},['a']),
  createElement('li',{class:'item'},['b']),
  createElement('li',{class:'item'},['c'])
])
let vertualDom2 = createElement('ul',{class:'lis111t'},[
  createElement('li',{class:'ite111m'},['1']),
  createElement('li',{class:'item'},['2']),
  createElement('div',{class:'item'},['3'])
])



// 将虚拟dom转换成真是DOM渲染到页面上
let el = render(vertualDom)
rendderDom(el,window.root)
let patchs = diff(vertualDom,vertualDom2)
// 给原生打补丁 重新更新视图
patch(el,patchs)
// console.log('patchs',patchs)
// console.log('vartualDom',vertualDom)

// DOM Diff比较两个虚拟DOM区别 比较两个对象的区别
// dom diff作用 根据2个虚拟对象创建出补丁，描述改变的内容，将这个补丁更新dom

// 差异计算
// 先序深度优先遍历

// 如果平级元素有互换 那么导致重新渲染
// 新增节点不会被更新
// index