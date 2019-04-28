import * as types from '../action-types'
export interface increment{
  type:typeof types.INCREMENT
}
export interface decrement{
  type:typeof types.DECREMENT
}
// type是用来给类型起别名的
export type Action = increment|decrement
export default{
  increment():any{
    return{type:types.INCREMENT}
  },
  incrementDeley():any{
    return function(dispatch:any,getState:any){
      setTimeout(function(){
        dispatch({type:types.INCREMENT})
      },1000)
    }
  },
  decrement(){
    return{type:types.DECREMENT}
  }
}