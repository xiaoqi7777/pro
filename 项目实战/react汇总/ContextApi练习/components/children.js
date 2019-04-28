import React, { Component } from 'react'


export default class children extends Component {
  render() {
    console.log(this.props.children)
    
    return (
      <div>
    {React.Children.map(this.props.children,item=>{
      return <li>{item}</li>
    })}
          
      </div>
    )
  }
}
