import React, { Component } from 'react'

export class Detail extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        123
        {this.props.match.params.id}
      </div>
    )
  }
}

export default Detail
