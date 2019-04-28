import * as Types from '../action-types'

function test(state = {age:0},action){
    console.log(state,action.testAdd)
    // action = {type:'ADD',count:3} //dispatch传递过来的
    switch(action.type){
      case Types.ADD_TEST:
        return {age:state.age+action.testAdd}
    }
  
    //第一次action没有东西 所以把{number:0}返回给redux
    return state
}
export default test