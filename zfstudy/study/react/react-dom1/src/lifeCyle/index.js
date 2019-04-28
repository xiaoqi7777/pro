//生命周期

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
class Child extends Component{
  render (){
    console.log('erzi')
    return (<div>
        儿子
    </div>)
  }
  state = {}
  static getDerivedStateFromProps(){
    // 默认需要有一个状态
      return {}
  }
  //setState  => willMount Didmount willReceiveProps 其他都不能调用他
  // componentWillReceiveProps(newProps){
  //   // 被抛弃了 新的api是静态属性了
  //   //组件接收到新的属性 第一次不会触发 
  //   //一般可以把接收到的新属性放到状态上 建议不要调用setState
  //   //更新周期 里面只有这个可以调setState 其他地方调会死循环 
  //   console.log('componentWillReceiveProps',newProps)
  // }
  shouldComponentUpdate(){
      console.log('erzi 是否更新')
    return true
  }
}
class Index extends Component {
  static defaultProps = {
    name:'sss'
  }
  state = {
    count:1
  }
  constructor(pop){
    super(pop)
    console.log('prop')
  }
  // componentWillMount(){ //新api不用他了
  //   console.log('componentWillMount组件将要挂载')
  // }
  shouldComponentUpdate(nextProps,nextState){
    // 组件是否需要更新
    // 一般在这儿做优化 返回true 会重新渲染视图 false 不会
    console.log('shouldComponentUpdate组件是否需要更新',nextProps,nextState)
    return nextState.count%2===0
  }
  // componentWillUpdate(){
  //   // 组件是将要更新 被抛弃了
  //   console.log('componentWillUpdate 组件是将要更新')
  // }
  getSnapshotBeforeUpdate(prevProps,prevState){
    //更新之前的属性和状态
    console.log('组件是将要更新',arguments) 
    // 必须有返回值 不能为默认值 返回后的值 是componentDidMount最后一个参数
    return {a:1}
  }
  componentDidUpdate(){
    console.log('123')
  }
  render() {
    console.log('渲染------')
    return (
      <div>
        {this.state.count}
        <Child a={this.state.count}></Child>
          <button onClick={()=>{
            this.setState({
              //无论数据是否变化 都会重新调用render方法
              count:this.state.count+1
            })
          }}
          >添加</button>
      </div>
    )
  }
  // 生命周期是同步 但是ajax 是异步 一定会更新两次
  componentDidMount(){
    // ajax 或者 获取don元素
    console.log('componentDidMount 组件渲染完成')
  }
}
ReactDOM.render(<Index></Index>,window.root)
