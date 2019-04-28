import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div>
        Home
        <button onClick={
          ()=>{
            this.props.history.push('/user')
          }
        }>
          跳转
        </button>
      </div>
    )
  }
}
export default Home