import React, { Component } from 'react'

export class Add extends Component {
  input = React.createRef()
  handleClick = ()=>{
    // let a = [1,2,3,'ss']
    // let b = JSON.stringify(a)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(this.input.current.value)
    users.push({id:Math.random(),name:this.input.current.value})
    localStorage.setItem('users',JSON.stringify(users))
    this.props.history.push('/user/li2')
  }
  render() {
    // 通过Route组件渲染出来的 页面有三个属性 history,lication,match, 这里叫编程式跳转
    console.log(this.props)
    return (<div>
        <input type="text" className="form-control"  ref={this.input}/>
        <button className='btn btn-primary' onClick={this.handleClick}>添加</button>
      </div>)
  }
}

export default Add
