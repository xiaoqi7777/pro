import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class MessageRight extends Component {
  handleChange = ()=>{
    console.log('123')
  }
  componentDidMount(){
    console.log(this)
  }
  render() {
    return (
      <div>
        总结数量{this.props.total}
      </div>
    )
  }
}

export default MessageRight
