import React, { Component } from 'react'

export class Add extends Component {
  input = React.createRef()
  btn=()=>{
   let users =   JSON.parse(localStorage.getItem('users'))||[]
   users.push({id:Math.random(),name:this.input.current.value})
   localStorage.setItem('users',JSON.stringify(users))
   this.props.history.push('/user/list')
  }
  render() {

    return (
      <div>
        <input type='text' className='form-control' ref={this.input} />
        <button className='btn btn-primary' onClick={()=>this.btn()}>按钮</button>
      </div>
    )
  }
}

export default Add
