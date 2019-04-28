
import context from './context'

import React, { Component } from 'react'


export default class Provider extends React.Component{
  render(){
    return (
      <context.Provider value={{store:this.props.store}}>
      {this.props.children}
      </context.Provider>
    )
  }
} 
