import React, { Component } from 'react'
import {withRouter}  from '../react-router-dom'
class Logo extends Component {
  btn =()=>{
    this.props.history.push('/')
    console.log(this.props)
  }
  render() {
    return (
      <div onClick={this.btn}>
        首页
      </div>
    )
  }
}
export default withRouter(Logo)