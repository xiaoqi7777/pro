
import React from 'react'
import router from 'umi/router'
export default class Login extends React.Component{
  handleLogin = ()=> {
    localStorage.setItem('login','ok')
    router.push('/profile')
  }
  render(){
    return (
        <div>
          <button onClick={this.handleLogin}>登录</button>
        </div>
      )
  }
}