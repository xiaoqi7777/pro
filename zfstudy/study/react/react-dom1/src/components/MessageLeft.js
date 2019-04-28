import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MessageItem from './MessageItem'

 class MessageLeft extends Component {
  handleChange = (num)=>{
    this.props.add(num)
  }
  componentDidMount(){
    console.log('**',this.props)
  }
  render() {
    return (
      <div>
        左边
        {this.props.list.map((item,index)=>{
          return <MessageItem list={item} key={index} fnc={this.props}></MessageItem>
        })}
        
      </div>
    )
  }
}

export default MessageLeft
