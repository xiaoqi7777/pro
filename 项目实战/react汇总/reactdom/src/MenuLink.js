import React, { Component } from 'react'
import {HashRouter as Router,Route,Switch,Redirect,Link,NavLink} from 'react-router-dom'

export default function(p){
  return <Route path={p.to} exact={p.exact||false} children={(props)=>{
    return <li className={props.match?'active':''}>
      <Link to={p.to}>{p.children}</Link>
    </li>
  }}/>
}