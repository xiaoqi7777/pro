import React, { Component } from 'react'
import store from '../store'
import actions from '../store/actions/Counter'
 class Counter extends Component {
  state={
    name : store.getState().counter.number
  }
  componentDidMount(){
    //监视 自动更新
    store.subscribe(()=>{
      this.setState({
        name : store.getState().counter.number
      })
    })
  }
  btn = ()=>{
    //dispatch传进来去的对象 在我们写的render里面获取
    store.dispatch(actions.add(3))
  }
  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <div onClick={()=>this.btn()}>点击增加11</div>
      </div>
    )
  }
}

export default Counter
