import React from 'react';
import ReactDOM from 'react-dom';

//jsx 是可以包含js的语法 
//1) <></> 最外层要包裹空标签 也可以写成 <React.Fragment>
//2) 行内样式的写法,jsx为了识别html 和js  需要用< { 来区分(<代表< html  {代表js )
//3) {}表示的是写js  三元表达式，取值，只要内容有返回值就可以显示
//4) 属性的名字有变化 class =>className for =>htmlFor
//5) v-html 把内容当成html  插入到页面中 
// 注意：
// 标签内没有东西 不要有空格 会报错
let str = "<img src='https://fanyi.bdstatic.com/static/translation/img/header/logo_cbfea26.png'>"
let fn = function () {
  return <span>你好</span>
  }

let ele = (
    <> 
      <h1 style={{background:'red'}}>123</h1>
      <p>
        内容 {fn()} {1==1?'true1':'1false'}
        {JSON.stringify({name:'123'})}  
      </p>
      <div className='box'>11111</div>
      <label htmlFor='username'>用户名</label>
      <input type='text' id = 'username' />
      {/* 
        dangerouslySetInnerHTML 是一个危险操作
       */}
      <div dangerouslySetInnerHTML={{__html:str}}></div>
    </>
    )
// 列表的渲染 map 有返回值,数组可以直接渲染到页面 对象不能
// 循环谁 就在谁的身上加key
let arr = ['吃饭','睡觉','打豆豆']

let newArr = arr.map((item,index)=>(<li key={index}>{item}</li>))
//jsx 元素可以进行嵌套
//封装功能 函数 组件
let obj = (
  <ul>
    {newArr}
  </ul>
)

ReactDOM.render(obj,window.root)