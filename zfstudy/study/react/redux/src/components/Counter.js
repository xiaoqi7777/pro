
import React from 'react';
import actions from '../store/actions/Counter'
// react-redux 提供了 connect方法 和Provuder
// 我们需要在使用redux数据的组件上 使用connect方法连接redux
import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'

class  Counter extends React.Component{

    add = ()=>{
      // console.log('1',store.getState())
      // store.dispatch(actions.add(2))
      this.props.add(3)
    }
    render(){
      return(
        <>
          <span>{this.props.number}</span>
          <div onClick={this.add}>开始的啊</div>
        </>
      )
    }
}
// connect 方法 执行两次后返回的是一个组件
// connect 方法最后一个函数的参数是原来的组件,会把redux中的状态映射到这个组件
// let mapStateToProps =(state)=> {//store.getState()
//   return {
//     number:state.Counter.number
//   }
// }
// let mapDispatchToProps =(dispatch)=> {//store.dispatch
//   return{
//     add:(num)=>dispatch(actions.add(num))
//   }
// }
// let bindActionCreators = (actions,dispatch) => {
//   let obj = {}
//   for(let key in actions){
//     obj[key] = (...args) => dispatch(actions[key](...args))
//   }
//   return obj
// }
// 如果connect 第一次执行的函数，如果第二个参数是对象类型，会自动调用bindActionCreators来实现
export default  connect((state)=>({...state.Counter}),actions)(Counter)

// export default  connect((state)=>({...state.Counter}),(dispatch)=>bindActionCreators(actions,dispatch))(Counter)


// state = {
//   // number:store.getState().Counter.number
// }
// componentWillMount(){
//   this.unsub = store.subscribe(()=>{
//     this.setState({
//       number:store.getState().Counter.number
//     })
//   })
// }
// componentWillUnMount(){
//   this.unsub()
// }