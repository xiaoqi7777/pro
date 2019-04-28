import React, { Component } from 'react'
import {Provider} from './context'
// 在hashRouter 中需要提供 history location match
export default class HashRouter extends Component {
  constructor(){
    super();
  }
  state = {
    location:{
      pathname:window.location.hash ? window.location.hash.slice(1):'/'
    }
  }
  componentDidMount(){
    window.location.hash = window.location.hash?window.location.hash.slice(1):'/';
    // hash值发生变化 重新更新路径
    window.addEventListener('hashchange',()=>{
      console.log('jinlail ')
      this.setState({
        location:{
          ...this.state.location,
          pathname:window.location.hash? window.location.hash.slice(1):'/'
        },
        s:'123'
      })
    })
  }
  render() {
    let value = {
      ...this.state,
      history:{
        push(to){
          console.log('push函数触发 => 会触发hashchange方法 页面组件就会更换',to)
          window.location.hash = to
        }
      }
    }
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}
