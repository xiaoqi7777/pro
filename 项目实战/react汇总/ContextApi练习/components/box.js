import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import Item from './item'
export default class box extends Component {
  render() {
    return (
      <Consumer>
      {({r})=>{
       return(  <div>
         <Item/>
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