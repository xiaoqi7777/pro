import React,{Component} from 'react'
import ReactDOM from 'react-dom'
export default class Box2 extends Component{
    btn = ()=>{
        this.props.fn(2)
    }
    render(){
        return (<div>
              <button onClick={this.btn}>子传父</button>
        </div>)
        }
}
