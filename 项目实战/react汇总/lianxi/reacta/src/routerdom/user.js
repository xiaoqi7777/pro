import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Route,Redirect,Switch,Link,NavLink} from 'react-router-dom'
import Add from './user/add'
import List from './user/list'
import Detail from './user/detail'
import Children from './user/children'

export default class App3 extends Component{

    render(){
        return (<div>
            <div>
                <Children>孩子</Children>
                <Link to='/user/add'>用户添加</Link>
                <br/>
                <Link to='/user/list'>用户列表</Link>
            </div>
            <Route path='/user/add' component={Add}></Route>
            <Route path='/user/list' component={List}></Route>
            <Route path='/user/detail/:id' component={Detail}></Route>

        </div>)
        }
}
