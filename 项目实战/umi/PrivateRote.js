
import React from 'react'
import {Route,Redirect} from 'react-router-dom'
/**
 * Route里渲染组件有三种配置方式
 * component render children
 */
export default (props)=>{
  console.log('props',props);
  
  let {render,...rest} = props
  // return <Route {...rest} render={()=><Redirect to="/login"/>}/>
  // return(props) === profile
  // 渲染有两个条件,1、是否登录，2、另一个路径是否匹配
  // return (<div>123</div>)
  console.log('===',localStorage.getItem('login'))
  return <Route render={ props=>localStorage.getItem('login')?render(props):<Redirect to="/login"/>}/>
}