import * as Types from '../action-types'

function counter(state = {number:0},action){
    // action = {type:'ADD',count:3} //dispatch传递过来的
    switch(action.type){
      case Types.INCREMENT:
        return {number:state.number+action.count}
    }
  
    //第一次action没有东西 所以把{number:0}返回给redux
    return state
}
export default counter