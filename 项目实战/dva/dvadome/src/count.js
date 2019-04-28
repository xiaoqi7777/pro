import React from 'react'
import dva,{connect} from 'dva'

// dva 其实就是一个函数
const app = dva();
// 状态 reducers effect subscription
// 每一个模型都有自己的命名空间, 为了防止充满
// combineReducers 作为key 合并reducers用的
// dispatch({type:'add'})
// state 是总的状态树
app.model({
  //里面的是 子状态
  namespace:'count',
  state:{number:0},
  reducers:{
    //相当于action type 参数是老状态 返回值是新状态
    add(state){return {number:state.number + 1}},
    minus(state){return {number:state.number - 1}}
  }
});

//connect 来自于react-redux
// state是总的状态树 {count:{number:0},todos:{list:[]}}
// state.count 变成当前组件的属性对象{number:0}
const App = connect(
  state=>state.count
)((props)=>(
  <div>
      <h2>{props.number}</h2>
      <button onClick={()=>props.dispatch({type:'count/add'})}>+</button>
      <button onClick={()=>props.dispatch({type:'count/minus'})}>-</button>
  </div>
))

app.router(()=><App/>);
app.start('#root')











