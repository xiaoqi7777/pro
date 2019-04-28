import React, { Component } from 'react'
import {Link} from 'react-router-dom' 

export default class List extends Component {
  state = {
    lists:[]
  }
  componentWillMount(){
    this.setState({
      lists:JSON.parse(localStorage.getItem('users'))
    })
  }
  render() {
    return (
      <div>
        <ul className='list-group'>
          {this.state.lists.map((list,index)=>{
            return(<li className='list-group-item' key={index}>
              <Link to={'/user/detail/'+list.id}>{list.name}</Link> 
            </li>)
          })}
          <li><Link to={{pathname:'/user/detail/',search:'1000'}}>坑</Link> </li>
        </ul>
      </div>
    )
  }
}
