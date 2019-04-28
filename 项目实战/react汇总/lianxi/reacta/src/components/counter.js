import React, { Component } from 'react'
import actions from '../store/actions/counter'
import {connect}  from 'react-redux'
import {bindActionCreators} from 'redux'
class Counter extends Component {
    constructor(props){
        super(props)
    }
    // state = {
    //     number:Store.getState().counter.number
    // }
    add(){
       this.props.add(1)
    }
    del(){
       this.props.del(1)
      //  Store.dispatch(actions.del(1))
    }

    state = {
      data:new Date().toLocaleString()
    }
    componentDidMount(){
      this.timer = setInterval(()=>{
        this.setState({
          data:new Date().toLocaleString()
        })
      },1000)
    }
    componentWillUnmount(){
      clearInterval(this.timer)
  }
  render() {
    return (
      <div>
        <span>定时器:{this.state.data}</span>
        <br/>
          <span>{this.props.number}</span>
        <button onClick={()=>this.add()}>+</button>
        <button onClick={()=>this.del()}>-</button>
        <button onClick={()=>this.pro()}>==</button>

      </div>
    )
  }
}
// react-redux 第一种写法
let mapStateToProps = (state)=>{ //state == store.getState
    return{
      number : state.counter.number
    }
}
let mapDispatchToProps = (dispatch)=>{ //state == store.dispatch
    return{
      add1:()=>{
        dispatch(actions.add(1))
      },
      del2:()=>{
        dispatch(actions.del(1))
      }
    }
};
// export default connect(mapStateToProps,mapDispatchToProps)(Counter) 

//第二种写法
// bindActionCreators原理
/* 
 let  bindActionCreators =function (actions,dispatch){
    let obj = {}
    for(let key in actions){
      obj[key]=(...args)=>{
        dispatch(actions[key](...args))
      }
    }
    return obj
  };
*/
//如果第二个参数传递的是一个对象(actions 返回的就是对象),那么内部会自动 调用bindActionCreators来实现
//也就是第二个参数是actions ===(dispatch)=>bindActionCreators(actions,dispatch) (react-redux内部自动实现)

export default connect(
  (state)=>({...state.counter}),
  // (dispatch)=>bindActionCreators(actions,dispatch)
  actions
  )(Counter) 
