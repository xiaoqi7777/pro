import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Consumer} from './Context'

class MessageItem extends Component {
  componentDidMount(){
    console.log('**111',this.props)
  }
  add = ()=>{
    this.props.fnc.fn(1)
  }
  clear = ()=>{
    this.props.fnc.clear()
  }
  render() {
    return (
      <Consumer>
        {({val})=>{
          return (
            <div>
              <span>{this.props.list.title}</span>
              <button onClick={this.add}>增加</button>
              <button onClick={()=>{val()}}>清除</button>
            </div>)
          }
        }
      </Consumer>
    )
  }
}

export default MessageItem