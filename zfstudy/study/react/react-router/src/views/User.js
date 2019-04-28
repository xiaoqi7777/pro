import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import Add from './Add'
import List from './List'
import Detail from './Detail'



export class User extends Component {
  render() {
    return (
      <div>
        <div className='col-md-3'>
          <nav className='nav nav-stacked'>
              <li><Link to='/user/li1'>用户添加</Link></li>
              <li><Link to='/user/li2'>用户列表</Link> </li>
          </nav>
        </div>
        <div className='col-md-9'>
          <Route path='/user/li1'  component={Add}></Route>
          <Route path='/user/li2' component={List}></Route>
          <Route path='/user/detail/:id' component={Detail}></Route>
          <Route path='/user/detail/' component={Detail}/>
        </div>
      </div>
    )
  }
}

export default User
