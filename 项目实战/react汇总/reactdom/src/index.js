import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Link, Switch} from './react-router-dom'

import User from './views/User'
import Profile from './views/Profile'
import Home from './views/Home'
import Logo from './views/Logo'
export default class App extends Component {
  render() {
    return (

        <HashRouter>
            <div>
                <div> 
                    {/* <Logo></Logo> */}
                    <Link to='/user'>取</Link>
                </div>
            <Switch>
                <Route path="/" component={Home} exact={true}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/user" component={User}></Route>
                {/* <Redirect></Redirect> */}
            </Switch>
            
            </div>
        </HashRouter>
    )
  }
}
ReactDOM.render(<App></App>,window.root)

// import React, { Component } from 'react'
// import {HashRouter as Router,Route,Switch,Redirect,Link,NavLink} from 'react-router-dom'
// import ReactDom from 'react-dom';
// import Home from './views/Home';
// import Profile from './views/Profile';
// import User from './views/User';
// import Protected from './Protected'
// import Login from './views/Login'
// import MenuLink from './MenuLink'

// import 'bootstrap/dist/css/bootstrap.css'

// class App extends Component {
//   render() {
//     return (
//         <Router>
//       <div>
//         <div className='Navbar navbar-default'>
//             <div className='container-fluid'>
//                 <div className='navbar-header'>
//                     <a className='navbar-brand'>珠峰管理</a>
//                 </div>
//                 <ul className='navbar-nav nav'>
//                     {/* <li><NavLink to='/'>首页</NavLink> </li> 
//                     <li><NavLink to='/user'>个人</NavLink> </li> 
//                     <li><NavLink to='/profile'>用户</NavLink> </li> 
//                     <li><NavLink to='/login'>登陆</NavLink> </li>  */}
//                     <MenuLink to='/' exact={true}>首页</MenuLink>
//                     <MenuLink to='/user' >个人</MenuLink>
//                     <MenuLink to='/profile' >用户</MenuLink>
//                     <MenuLink to='/login' >登陆</MenuLink>
//                 </ul>
//             </div>
//         </div>
//         <div className="container">
//         <Switch>
//             <Route path='/' exact={true} component={Home}/>
//             <Protected path='/profile'  component={Profile}/>
//             <Route path='/login'  component={Login}/>
//             <Route path='/user' component={User}/>
//             <Redirect to='/' />
//         </Switch>
//         </div>
      
//       </div>
//       </Router>
//     )
//   }
// }

// ReactDom.render(<App />,window.root)