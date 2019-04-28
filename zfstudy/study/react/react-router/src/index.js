
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Switch,Redirect,Link,NavLink} from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'
import User from './views/User'
import Profile from './views/Profile'
import Protected from './Protected';

import MenuLink from './MenuLink'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component{

  render(){
    return(
      <Router>
      <div>
        {/* Switch组件匹配到一个后就不会继续匹配了 */}
        <div className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand'>后台管理</a>
            </div>
            <ul className='navbar-nav nav'>
              <MenuLink to='/' exact={true}>首页</MenuLink>
              <MenuLink to='/profile' exact={true}>个人中心</MenuLink>
              <MenuLink to='/user' exact={true}>用户</MenuLink>
              <MenuLink to='/login' exact={true}>登录</MenuLink>
            {/* <li><Link to='/'>首页123</Link></li> 
            <li><Link to='/profile'>个人中心213</Link></li> 
            <li><Link to='/user'>用户</Link></li>  */}
            </ul>
          </div>
        </div>
        
        <div  className="container">
          <Switch>
            {/* <Protected path='profile1' component={Profile}></Protected> */}
            {/* 默认需要先匹配到一级 才能展现二级 */}
            <Route path="/"  exact={true} component={Home} />
            <Protected path="/profile" component={Profile} />
            <Route path="/sg"  exact={true} component={Home} />
            <Route path="/user"  component={User} />
            <Route path='/login' component={Login}></Route>
            {/* <Route component={User} /> */}
            <Redirect to="/" /> 
          </Switch>
        </div>
      </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />,window.root)
function A(){
  return <h1>111</h1>
}
/*
  HashRouter / BrowserRouter
  在引入的时候 起别名
  HashRouter as rouer

  1、默认情况下 从上到下匹配 不严格匹配
      exact={true} 严格匹配
      二级路由:必须先匹配到 一级路由
      有此路由下有二级路由的时候不能加  加了会导致 二级路由匹配不到 直接进入 Redirect
    若不写path 路径默认是 /
  2、Switch组件匹配到一个后就不会继续匹配了
  3、Redirect重定向
  
  Router  是用来保持与 location 的同步
          组件下只允许存在一个子元素，如存在多个则会报错。 也就是紧接着Router里面要套一层div或者空元素
  
  Route   组件主要的作用就是当一个location匹配路由的path时
            path（string）: 路由匹配路径。（没有path属性的Route 总是会 匹配）；
            exact（bool）：为true时，则要求路径与location.pathname必须完全匹配；
            strict（bool）：true的时候，有结尾斜线的路径只能匹配有斜线的location.pathname；
          提供了三种渲染方式:
            component： <Route path="/"  exact={true} component={Home} />
            render： 
                1、<Route path="/home" render={() => <div>Home</div>}/>
                如果前面有传component
                2、const FadingRoute = ({ component: Component, ...rest }) => (
                    <Route {...rest} render={props => (
                      <FadeIn>
                        <Component {...props}/>
                      </FadeIn>
                    )}/>
                  )
                  <FadingRoute path="/cool" component={Something}/>

            children：与render属性的工作方式基本一样，除了它是不管地址匹配与否都会被调用；
            render 和 component 唯一不同的是render是一个函数 他返回的结果会被进行渲染
            component 可以里面可以放函数 也可以是calss
   */
