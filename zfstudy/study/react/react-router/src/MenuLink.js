
import React, { Component } from 'react'

import {Link,Route} from 'react-router-dom'

export default function (p){
  return (<Route path={p.to} exact={p.exact} children={(props)=>{
    console.log('p',props)
    return <li className={props.match?'active':''}>
    <Link to={p.to}>{p.children}</Link>
    </li>
  }} />)
}
