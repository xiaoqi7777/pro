import React, { Component } from 'react'
import {Consumer} from './context'
import pathToRegExp from 'path-to-regexp'
export default class Route extends Component {
  render() {
    return (
      <Consumer>
      {(value)=>{
        let {location:{pathname}} = value 
        let props = {...value,match:null}
        let {path,component:Component,exact=false} = this.props
        let keys = [];
        // 得到的是一个正则=>把path转化成一个匹配路径
        let reg = pathToRegExp(path, keys, {end:exact});
        // console.log(reg,pathname,reg.test(pathname))
          if(reg.test(pathname)){
          // 如果匹配到后 需要看看有没有路径参数 /user/detail/:id
          // console.log(pathname.match(reg),keys)
          let [,...args] = pathname.match(reg)
          keys = keys.map(k => k.name)
          let params = keys.reduce((memo,key,index)=>(memo[key]=args[index]),{})
          props.match = {
            params
          }
          return <Component {...props}></Component>
        }
        return null
      }}
      </Consumer>
    )
  }
}
