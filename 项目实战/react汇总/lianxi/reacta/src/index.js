// 基本用法 + store 
// import React,{Component} from 'react';
// import ReactDOM from 'react-dom'

// import App from './App'

// ReactDOM.render(<App/>,window.root)


// 路由
import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import {HashRouter,Route,Redirect,Switch,Link,NavLink} from 'react-router-dom'
import my from './routerdom/my'
import user from './routerdom/user'
import home from './routerdom/home'
import Protected from './routerdom/Protected'
ReactDOM.render(
    <HashRouter>
        <div>
            <ul>
                <li><NavLink to='/'>首页</NavLink></li>
                <li><NavLink to='/my'>个人中心</NavLink></li>
                <li><NavLink to='/user'>用户</NavLink></li>

            </ul>
            <Switch>
                <Route path='/' exact={true} component={home} />
                <Protected path='/123' component={my}/>
                {/* <Route path='/my' component={my} /> */}
                <Route path='/user' component={user} />
                <Redirect to="/" />
            </Switch>
        </div>
    </HashRouter>
    ,window.root)