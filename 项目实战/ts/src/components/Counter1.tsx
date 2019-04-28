import * as React from 'react';
import {connect} from 'react-redux'
import { Counter1,Store } from '../types';
import actions from '../store/actions/conter1'
interface Props{
    number:number,
    increment:any,
    decrement:any
}
 class Counter extends React.Component<Props>{
    render(){
        let {number,increment,decrement} = this.props
        return(
            <div>
                <p>{this.props.number}</p>
                <div onClick={this.props.increment}>+</div>
                <div onClick={this.props.decrement}>-</div>
            </div>
        )
    }
}

export default connect(
    (state:Store):Counter1=>state.counter1,
    actions
)(Counter);
