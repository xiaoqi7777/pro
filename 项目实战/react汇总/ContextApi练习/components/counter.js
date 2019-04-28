import React, { Component } from "react";

import actions from '../store/actions/Counter'
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import { Provider } from './Context'
import Box from './box'

class Counter extends Component {
  state = {
    number: ''
  };
  render() {
    console.log(this.props)
    return (
      <Provider value={{r:'123'}}>
      <>
        <p>{this.props.number}</p>
        <div onClick={() => this.props.del(3)}>点击减少</div>
        <div onClick={() => this.props.add(3)}>点击增加</div>
        <Box/>

      </>
      </Provider>
    );
  }
}
//connect 方法执行2次后 返回的是一个组件
//第二个参数是原来的组件 会把redux中的状态映射到这个组件上
// 11 、connect 第一个参数
// let mapStateToProps = (state) => { //store.state
//   console.log('state',state)
//   return {
//     number : state.counter.number
//   }
// }
// 12、 简化11的写法
let mapStateToProps = (state) => ({...state.counter})
// 21 、connect 第二个参数
let mapDispatchToProps = (dispatch) => { //store.dispatch
  console.log('dispatch',dispatch)
  return{
    // store.dispatch({ type: "ADD", count: 3 })
    add:(num)=>dispatch(actions.add(3)),
    del:(num)=>dispatch(actions.del(3))
    
  }
}
// export default connect(mapStateToProps,mapDispatchToProps)(Counter)
// 22 、简化21写法
// dispatch原本就是connect传递进来的  bindActionCreators 是redux方法接收 actions和dispatch 会包装成 21 返回的那种形式 

function bindActionCreators(actions,dispatch){
  let obj = {}
  for(let key in actions){
    obj[key] = (...args)=>dispatch(actions[key](...args))
  }
  return obj;
}

// export default connect(mapStateToProps,(dispatch)=>bindActionCreators(actions,dispatch))(Counter)

// 如果connect 第一次执行的函数 如果第二个参数是一个对象类型 会自动在内部调用bindActionCreators 来实现
export default connect(mapStateToProps,actions)(Counter)

