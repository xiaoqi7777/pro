import * as Types from '../types'

export default function list (state={data:[]},actions) {
    switch(actions.type){
      case Types.TOLIST:
      console.log(actions)
      return {data:[...state.data,actions.data]}
    }
    return state
}