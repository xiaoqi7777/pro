import React, { Component } from 'react'
import Context from './context'
export default class Provider extends Component {
// Provider 主要是提供store使用的
  render() {
    return (
      <Context.Provider value={{store:this.props.store}}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

