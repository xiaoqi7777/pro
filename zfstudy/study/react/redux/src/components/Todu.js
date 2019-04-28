
import React from 'react';
import actions from '../store/actions/Todu'
import {connect} from 'react-redux'
 class  Todu extends React.Component{
    inpu = React.createRef()

    add = ()=>{
  console.log('123')

      // console.log(store.getState().Todu)
      this.props.addTodu(this.inpu.current.value)
      // store.dispatch(actions.addTodu(this.inpu.current.value))
    }
    render(){
      return(
        <>
          <input type='text' ref={this.inpu}/>
          <div onClick={this.add}>增加</div>
          <ul>
            {this.props.todos.map((item,index)=>{
              return (<li key={index}>{item}</li>)
            })}
          </ul>

        </>
      )
    }
}
let mapStateToProps = (state)=>{
  return {
    todos :state.Todu
  }
}
let mapDispatchToProps = (dispatch)=>{
  return {
    addTodu:(todo)=>{dispatch(actions.addTodu(todo))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Todu)
// <ul>
// {this.props.todos.map((item,key)=>(
//  <li key={key}>{item}</li>
// ))}
// </ul>

// state = {
//   arr:store.getState().Todu
// }
// componentWillMount(){
//   store.subscribe(()=>{
//     this.setState({
//       arr:store.getState().Todu
//     })
//   })
// }