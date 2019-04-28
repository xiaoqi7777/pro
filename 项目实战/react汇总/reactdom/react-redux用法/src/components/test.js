import React, { Component } from 'react'
import actions from '../store/actions/test'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class test extends Component {
  btn = ()=> {
    this.props.add(2)
  }
  render() {
    console.log(this.props.children)
    return (
      <div>
        {this.props.testNumber}
        <button onClick={()=>this.btn()}>增加</button>
      </div>
    )
  }
}

let mapStateToProps = (state)=>{ //store.getState()
  return{
    testNumber:state.test.age
  }
}
let mapDispatchToProps = (dispatch)=>{//store.dispatch
  return{
    add:(n)=>dispatch(actions.addTest(n))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(test)

