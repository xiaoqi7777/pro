import React from 'react'
import {connect} from 'react-redux'
import actions from '../store/actions/list'
class List extends React.Component{
  render(){
    return (
      <div>
        <div>ToDo List</div>
        {this.props.count.map((item,index)=>{
          return (
            <div key={index}>
              {item}
            </div>
          )
        })}
        <button onClick={this.props.add}>添加</button>
      </div>
    )
  }
}

let  mapStateToProps = (state)=>{
  //store.getState()
  return{
    count : state.list.data
  }

}

let mapDispatchToProps = (dispatch)=>{
  //store.dispatch
  return{
    add:()=>{
      dispatch(actions.tolist(1))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(List)