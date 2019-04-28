import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class List extends Component {
  state ={
    lists:[]
  }
componentWillMount(){
  let lists = JSON.parse(localStorage.getItem('users'))||[]
  this.setState({
    lists
  })  
}
  render() {
    console.log(this.state.lists)
    return (
      <div>
        {this.state.lists.map((list,index)=>{
          return (<li key={index}>
           <Link to={'/user/Detail/'+list.id}> {list.name} </Link> 
           </li>)
        })}
        <li><Link to={{pathname:'/user/Detail',search:'?id=100'}}>XX</Link></li>
      </div>
    )
  }
}

export default List
