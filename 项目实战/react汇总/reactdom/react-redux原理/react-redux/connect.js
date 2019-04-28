import React, { Component } from 'react'
import Context from './context'
// one
// let connect = (mapStateToProps,mapDispatchToProps)=>(Component)=>{
//   return  ()=>{
//     return <Context.Consumer>
//       {({store})=>{
//         console.log('111111',store) 
//         let mapState =  mapStateToProps(store.getState())
//         console.log('/',mapState)
//         let mapDispatch =  mapDispatchToProps(store.dispatch)
//         let obj = {ke1y:'sg'}
//         return <Component {...obj} {...mapState} {...mapDispatch}></Component>
//       }}
//     </Context.Consumer>
//   }
// }

// two
let connect = (mapStateToProps,mapDispatchToProps)=>(Component)=>{
  return  ()=>{
    class Proxy extends React.Component{
      state = mapStateToProps(this.props.store.getState())
      componentDidMount() {
        this.unsub = this.props.store.subscribe(()=>{
          this.setState(mapStateToProps(this.props.store.getState()))
        })
      }
      componentWillUnmount(){
        this.unsub()
      }
      render(){
        // 父组件刷新 子组件一定刷新
        let mapDispatch =  mapDispatchToProps(this.props.store.dispatch)
        let obj = {ke1y:'sg'}
        return <Component {...obj} {...this.state} {...mapDispatch}></Component>
      }
    }
    return <Context.Consumer>
      {({store})=>{
        // 将状态和 dispatch 拿到执行函数 把结果对象传递给原本的component渲染
        return <Proxy store={store}></Proxy>
      }}
    </Context.Consumer>
  }
}

export default connect;

