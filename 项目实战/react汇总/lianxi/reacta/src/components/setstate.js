// import React,{Component} from 'react'
// import ReactDOM from 'react-dom'
// export default class SetState extends Component{
//     constructor(props){
//         super(props);
//     }
//     state={
//         number : this.props.num
//     }
//     /*  setState第一个参数是赋值  第二个参数是回调
//         this.setState({number:this.state.number},()=>{
//             this.setState(.......)
//         })
//         一般加异步就是一个个执行 否则后面覆盖前面
//         用这个回调 也可以一个个执行 , 但这个是嵌套

//         也可以   prevState是上次的结果
//         this.setState((prevState)=>({number:prevState.number+1}))
//         this.setState((prevState)=>({number:prevState.number+3}))

//     */ 
//     add1 = ()=>{
//         // 只会渲染一次
//         this.setState({
//             number:this.state.number+1
//         })
//         this.setState({
//             number:this.state.number+3
//         })
//         this.setState({
//             number:this.state.number+2
//         })
//     }
//     add2 = ()=>{
//         // 加异步  就会渲染多次
//         setTimeout(()=>{
//             this.setState({
//                 number:this.state.number+1
//             })
//             this.setState({
//                 number:this.state.number+3
//             })
//             this.setState({
//                 number:this.state.number+2
//             })
//         },1000)
//     }
//     render(){
//         return (<div>
//              当前显示的数字: {this.state.number}
//              <button onClick={this.add1}>正常触发</button>
//              <button onClick={this.add2}>延迟触发</button>
//         </div>)
//         }
// }

// 默认是批量更新的   setstate 异步更新原理
let isBatchingUpdate = true
let transcation = (component)=>{
    component.state = component.pendingState
    component.render();
    isBatchingUpdate = false
}

class My{
    constructor(){
        this.state = {number:0};//自己的状态
        this.pendingState = {...this.state}
    }
    setState(obj){
        if(isBatchingUpdate){
            //批量更新 这里直走一次  也就是后面覆盖前面
            // console.log('批量更新',obj)
            this.pendingState = {...this.pendingState,...obj}
        }else{
            //异步更新 这里走完 一次 在
            // console.log('异步更新',obj)
            this.pendingState = {...this.pendingState,...obj}
            transcation(this)
        }
    }
    update(){
        setTimeout(()=>{
            this.setState({number:this.state.number + 1})
            this.setState({number:this.state.number + 3})
            this.setState({number:this.state.number + 2})
        },0)
        transcation (this)
        
    }
    render(){
        console.log(this.state.number)
    }
}

let my = new My()
my.update()


