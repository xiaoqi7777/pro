//全局布局组件
import React,{Fragment} from 'react'
import Link from 'umi/link'
import withRouter from 'umi/withRouter'
import {TransitionGroup,CSSTransition} from 'react-transition-group'
 class Layout extends React.Component{
  // 路由监视
  // componentWillMount(){
  //   this.props.history.listen((location,actions)=>{
  //     console.log(actions,location)
  //   })
  // }
  render(){
   return( <Fragment>
        <div>
          <Link to="/">首页</Link>
        </div>
        <div>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/user">用户管理</Link></li>
            <li><Link to="/profile">个人设置</Link></li>
          </ul>
        </div>
        <div>
          <TransitionGroup>
            <CSSTransition key={this.props.location.pathname} classNames="fade" timeout={300}>
              {this.props.children}
            </CSSTransition>
          </TransitionGroup>
        </div>
          
    </Fragment>)
  }
}

export default withRouter(Layout)