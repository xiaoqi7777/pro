import React, { Component } from 'react'
import ReactDom, {render} from 'react-dom'
import {createStore} from 'redux'
function reducer(state ={number:0},action){
  switch(action.type){
    case 'AD':
    return {number:state.number + action.v}
  }
  return state
}

let store = createStore(reducer)
window.store = store;

export class Index extends Component {
  state = {
    number:store.getState().number
  }
  componentWillMount(){
    this.unsub =   store.subscribe(()=>{
      this.setState({
        number:store.getState().number
      })
    })
  }
  add = ()=>{
    store.dispatch({type:'AD',v:1})
  }
  componentWillUnmount(){
    this.unsub();
  }
  render() {
    return (
      <div>
      {this.state.number}
      <button onClick={()=>this.add()}>+</button>
      </div>
    )
  }
}

ReactDom.render(<Index />,window.root)