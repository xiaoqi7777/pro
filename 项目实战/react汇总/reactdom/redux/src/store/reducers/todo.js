import * as Types from '../action-types'

function todo(state = [],action){
    // action = {type:'ADD',count:3} //dispatch传递过来的
    switch(action.type){
      case Types.ADD_TODO:
        return [...state,action.todo]
    }
  
    //第一次action没有东西 所以把{number:0}返回给redux
    return state
}
export default todo