import React, { Component } from 'react'
import actions from '../store/actions/Counter'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

 class Counter extends Component {
  btn = ()=>{
    //dispatch传进来去的对象 在我们写的render里面获取
    this.props.add(3)
  }
  render() {
    return (
      <div>
        <div>{this.props.number}</div>
        <div onClick={()=>this.btn()}>点击增加123</div>
      </div>
    )
  }
}
// let mapStateToProps = (state)=>{ //store.getState()
//   return{
//     number:state.counter.number
//   }
// }
// let mapDispatchToProps = (dispatch)=>{//store.dispatch
//   return{
//     add:(n)=>dispatch(actions.add(n))
//   }
// }
export default connect((state)=>state.counter,(dispatch)=>bindActionCreators(actions,dispatch))(Counter)
