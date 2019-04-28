import React from 'react'
import {connect} from 'react-redux'
import actions from '../store/actions/counter'
class Counter extends React.Component{
  render(){
    return (
      <div>
        <div>计数</div>
        <div>{this.props.count}</div>
        <button onClick={this.props.add}>添加</button>
        <button onClick={this.props.asyncAdd}>async 添加</button>
        <button onClick={this.props.sagaAdd}>saga 添加</button>
        
        <button onClick={this.props.del}>减少</button>
        <button onClick={this.props.asyncDel}>async 减少</button>
      </div>
    )
  }
}

let  mapStateToProps = (state)=>{
  // console.log('state',state);
  return{
    count : state.counter.count
  }

}

let mapDispatchToProps = (dispatch)=>{
  //store.dispatch
  return{
    add:()=>{
      dispatch(actions.add(1))
    },
    asyncAdd:()=>{
        return dispatch(actions.add(1))
    },
    sagaAdd:()=>{
      dispatch(actions.sagaAdd(1))
    },
    del:()=>{
      dispatch(actions.del(1))
    },
    asyncDel:()=>{
      setTimeout(()=>{
        return dispatch(actions.del(1))
      },1000)
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter)