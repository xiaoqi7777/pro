/**
 * title: profile page
 * Routes:
 *  - ./PrivateRote.js
 */
import React from 'react'
import router from 'umi/router';//history
export default class Profile extends React.Component{
  handleExit = ()=> {
    localStorage.removeItem('login')
    router.push('/login')
  }
  render(){
    return (
        <div>
          profile
          <button onClick={this.handleExit}>退出</button>
        </div>
      )
  }
}