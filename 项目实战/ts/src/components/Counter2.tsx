import * as React from 'react';
import {connect} from 'react-redux'
import { Counter2,Store } from '../types';
import actions1 from '../store/actions/conter2'
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
    (state:Store):Counter2=>state.counter2,
    actions1
)(Counter);
