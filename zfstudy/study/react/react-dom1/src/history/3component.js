// 组件的特点 和 好处 
// 方便复用

// react中 函数就是一个组件(组件名,必须是大写)，和jsx元素 react元素 来进行区分
// react看到大写就是组件 小写就是jsx元素
import  React from 'react';
import ReactDOM from 'react-dom';
//  组件的分类  函数型组件  类组件

// 函数组件 1) 没有this指向 2) 没有生命周期  3) 没有状态
// class 继承{ Component } 就有了上面3个内容
function Clock(props) {
  return <h1>当前时间{props.date.toLocaleString()}</h1>
}

// ReactDOM.render(Clock(),window.root)
// ReactDOM.render(<Clock></Clock>,window.root)
// 可以和jsx元素 混用

setInterval(()=>{
  //render方法只更新有变化的地方

  ReactDOM.render(
    <div>
    <Clock date = {new Date()}></Clock>
    <Clock date = {new Date()}></Clock>
    </div>
    ,window.root)
},1000)
