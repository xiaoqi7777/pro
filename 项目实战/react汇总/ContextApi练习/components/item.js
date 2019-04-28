import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
export default class item extends Component {
  render() {
    return (
      // 提供的值必须叫value
      <Consumer>
      {({r})=>{
       return(  <div>
          <button onClick={()=>{
            console.log('r',r)
          }}>按键
          </button>
        </div>
        )
      }}
      </Consumer>
    )
  }
}
