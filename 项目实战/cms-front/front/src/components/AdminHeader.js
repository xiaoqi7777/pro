import React from 'react';
import {Layout} from 'antd';
import {connect} from 'dva'
const {Header} = Layout
let logo = require('@/assets/zhufeng.png')

class AdminHeader extends React.Component{
  componentWillMount = () => {
    this.props.dispatch({
      type:'login/loadUserFromLocal'
    })
  };
  
  render(){
    return(
      <Header>
        <img className="logo" src={logo} />
        <span className="welcome">
          欢迎 {this.props.user&&this.props.user.username} 登录
        </span>
      </Header>
    )
  }
}

export default connect(
  state=>state.login
)(AdminHeader);
