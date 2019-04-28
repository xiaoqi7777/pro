import React, { Component } from 'react'
import store from '../store'
import actions from '../store/actions/Todo'

class Todo extends Component {
  input = React.createRef()
  state = {
    todos : store.getState().todo
  }
  componentWillMount(){
    store.subscribe(()=>{
      this.setState({
        todos : store.getState().todo
      })  
    })
  }
  btn = ()=>{
    store.dispatch(actions.addTodo(this.input.current.value))
  }
  render() {
    return (
      <div>
        <input type='text' ref={this.input}/>
        <button onClick={()=>this.btn()}>按123</button>
        <ul>
          {this.state.todos.map((item,key)=>{
           return <li  key={key}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}
export default Todo 
