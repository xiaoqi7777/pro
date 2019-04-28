import React from 'react'
import Link from 'umi/link'
export default class List extends React.Component{
  render(){
    return(
      <div>
       <li><Link to="/user/detail/1">张三</Link></li>
       <li><Link to="/user/detail/2">李四</Link></li>
      </div>
    )
  }
}