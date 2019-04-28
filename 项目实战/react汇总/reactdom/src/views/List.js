import React, { Component } from 'react'
import { Link } from '../react-router-dom'
export default class Add extends Component {
  state = {
    lists:[
      {
        id:'1111111',
        name:'A'
      },
      {
        id:'2222222222',
        name:'B'
      },
      {
        id:'333333333',
        name:'C'
      },
      {
        id:'444444444',
        name:'D'
      },
    ]
  }
  render() {
    return (
      <ul>
        {this.state.lists.map((list,index) => {
         return <li key={index}>
            <Link to={"/user/detail/"+list.id}>{list.name}</Link>
          </li>
        })}
      </ul>
    )
  }
}
