import * as React from 'react';
import actions from '../store/actions/counter'
import {connect} from 'react-redux'
import {Store} from '../types'
interface IProps{
  number:number,
  increment:any,//是一个函数
  decrement:any,//是一个函数
  incrementDeley:any,
}

 class Counter extends React.Component<IProps>{
  render(){
    let {number,increment,decrement,incrementDeley} = this.props;
    return(
      <div>
        <p>{number}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={incrementDeley}>延迟</button>
        
      </div>
    )
  }
}
let mapStateToProps = function(state:Store):Store{
  return state
}
export default connect(mapStateToProps,actions)(Counter)