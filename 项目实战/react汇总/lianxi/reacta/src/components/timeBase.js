import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import A from './class'
export class timeBase extends Component {
    state={
        date:new Date().toLocaleString()
    }
    componentWillMount(){
        this.timer = setInterval(()=>{
            this.setState({
                date:new Date().toLocaleString()
            })
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    /*
    生命周期
    开始
        constructor  =>
        componentWillMount => 组件将要渲染(不再这儿发请求，后期会被删掉)
        componentDidMount =>  组件渲染完成(在这儿发ajax请求)
        render  =>         开始渲染
            只要调用setState(必须赋值 最起码给一个空 this.setState({}) )  
            无论数据是否变化 都会调用render方法
    运行
        setstate和porps都会走=>
        shouldComponentUpdate(nextProps,nextState)
            优化在这里做,返回ture 执行render() false不执行 
        componentDidUpdate  组件更新完成
        componentWillUpdate 组件将要更新

        props变化的时候=>
        componentWillReceiveProps(nextProps) 组件接受到了新的属性  (第一次不触发)
          1.父组件传递新的属性 2.发送ajax 3.可以把数据转化成状态(官方不建议在这调用 setState)

        componentWillUnmount  组件将要销毁 
        
        能调用 setState 时候=>construtor componentWillMount componentDidMount componentWillReceiveProps
                            其他地方调用 会无限循环     
    */

    // onClick={this.fn2('123')} 会自动执行
    // onClick={()=>{this.fn2('123')}} 这个才是点击的时候 执行的

// jsx元素时间 所有的属性都是 onXxxx
    //第一种方式
    fn1 = this.handleClick.bind(this)
    handleClick(){
        // console.log('handleClick-fn1')
    }
    //第二种方式  es7
    fn2 = (item)=>{
        // console.log('fn2',item)
    }
    
    del=()=>{
        //卸载当前组件
        ReactDOM.unmountComponentAtNode(window.root)
    }
  render() {
      let a = new A()
    // console.log('=====',a.a)
    return (
      <div>
        时间:{this.state.date}
        <button onClick={this.fn1}>点击事件1</button>
        <button onClick={()=>{this.fn2('123')}}>点击事件2</button>
        <button onClick={this.del}>卸载当前组件</button>
      </div>
    )
  }
}

export default timeBase
