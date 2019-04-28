import React, { Component } from 'react'
import actions from '../store/actions/Todo'
import {connect} from 'react-redux'

class Todo extends Component {
  input = React.createRef()

  btn = ()=>{
    console.log(this.props)
    
    this.props.add(this.input.current.value)
  }
  render() {
    return (
      <div>
        <input type='text' ref={this.input}/>
        <button onClick={()=>this.btn()}>按钮</button>
        <ul>
          {this.props.todo.map((item,key)=>{
           return <li  key={key}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}

// let mapStateToProps = (state)=>{ //store.getState()
//   return{
//     number:state.counter.todo
//   }
// }
let mapDispatchToProps = (dispatch)=>{//store.dispatch
  return{
    add:(n)=>dispatch(actions.addTodo(n))
  }
}

export default connect((state)=>({...state}),mapDispatchToProps)(Todo)
