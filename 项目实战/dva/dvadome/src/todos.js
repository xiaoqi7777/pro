import React,{Component} from 'react'
import dva,{connect} from 'dva'
import {HashRouter as Router,Route,Switch,Redirect,Link,NavLink} from 'react-router-dom'
// dva 其实就是一个函数
const app = dva();


app.model({
  //里面的是 子状态
  namespace:'todos',
  state:{
    list:[
      {id:1,title:'吃饭',completed:false},
      {id:2,title:'喝水',completed:true}
    ],
    filter:'all'
  },
  reducers:{
    add(state,{payload}){
      let newTodo = {title:payload,completed:false};
      newTodo.id = state.list.length>0?state.list[state.list.length-1].id+1:1
      let list = [...state.list,newTodo]
      //数据持久化
      localStorage.setItem('todos',JSON.stringify(list))
      return {...state,list}
    },
    toggle(state,{payload}){
       let list = state.list.map(function(item){
        if(item.id == payload){
          item.completed = !item.completed
        }
        return item
      })
      return {...state,list}
    },
    load(state,{payload}){
      return {...state,list:payload}
    }
  },
  // 订阅
  subscriptions:  {
    setup({history,dispatch}){
      let todosStr = localStorage.getItem('todos')
      let list = todosStr?JSON.parse(todosStr):[]
      // Warning: dispatch: todos/load should not be prefixed with namespace todos
      // 在model时派发action,不需要加命名空间的前缀 默认就是, 可以省略
      // dispatch({type:'todos/load',payload:list})
      dispatch({type:'load',payload:list})
    }
  }
});
//connect 来自于react-redux
// state是总的状态树 {count:{number:0},todos:{list:[]}}
// state.count 变成当前组件的属性对象{number:0}

class Todos extends Component{
  add = ()=>{
    let title = this.content.value;
    this.props.dispatch({type:'todos/add',payload:title})
    this.content.value = ''
  }
  toggle = (event)=>{
    let id = event.toggle.value
    this.props.dispatch({type:'todos/toggle',payload:id})
  }
  render() {
    return(
      <div>
        <input type="text" ref={input=>this.content=input}/>
        <button onClick={this.add}>添加</button>
        <ul>
          {
            this.props.list.map(item=>(
              <li key={item.id}>
                {item.title}
                <input type="checkbox" value={item.id} checked={item.completed} onChange={this.toggle}/>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const App = connect(
  state=>state.todos
)(Todos)

app.router(()=><App/>);
app.start('#root')











