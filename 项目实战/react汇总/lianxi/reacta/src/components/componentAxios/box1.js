import React,{Component} from 'react'
import {Consumer} from './context'
export default class Box1 extends Component{
    state={
        data:'',
        total:"",
    }

    render(){
        /**
            Consumer 固定写法 
            <Consumer>
                {(value)=>{//value 上游就是value传递过来的对象
                    。。。写正常的内容
                }}
            </Consumer>
        */
        return (
        <Consumer>
            {(value)=>{
               return( <div>
                    接受父组件传递的东西------------- {this.props.total}
                    {this.props.lists.map((item,index)=>{
                        return <div key={index}>{item.title}</div>
                    })}
                    <button onClick={()=>{value.r()}} >归零</button>
                </div>
               )
            }}
        </Consumer>
        )}
}
