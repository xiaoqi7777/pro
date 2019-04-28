import Context from './context'
import React, { Component } from 'react'
import {bindActionCreators} from 'redux';

let connect =(mapS,mapD)=>(Component)=>{
  return ()=>{
    class Proxy extends React.Component{
      state = mapS(this.props.store.getState())
      componentDidMount() {
        this.unsub = this.props.store.subscribe(()=>{
          this.setState(mapS(this.props.store.getState()))
        })
      }
      componentWillUnmount(){
        this.unsub()
      }
      render(){
        let  d;
        if(typeof mapD === 'object'){
          d = bindActionCreators(mapD,this.props.store.dispatch)
        }else{
          d = mapD(this.props.store.dispatch)
        }
        return <Component {...this.state} {...d} ></Component> 
      }
    }
  return (<Context.Consumer>
    {({store})=>{
      return <Proxy store={store}></Proxy>
    }}
    </Context.Consumer>)
}
}
export default connect