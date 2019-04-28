import React, { Component } from 'react'
import actions from '../store/actions/todo'
import {connect} from 'react-redux'
// import {bindActionCreators}  from 'redux'
class TodoList extends Component {
  inp = React.createRef()
 
  btn(){
    this.props.todo(this.inp.current.value)
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.inp}/>
        <button onClick={()=>this.btn()}>增加</button>
        <div >
          {this.props.todos.map((item,index)=>{
            return <div key={index}>{item}-{index}</div>
          })}
        </div>
      </div>
    )
  }
}

export default connect (
  (state)=>({todos:state.todoList}),
  // (dispatch)=>bindActionCreators(actions,dispatch)
  actions
)(TodoList)
