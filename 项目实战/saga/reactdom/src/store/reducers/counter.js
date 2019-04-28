import * as Tpyes from '../types'

export default function counter (state={count:0},actions) {
    switch(actions.type){
      case Tpyes.INCREMENT:
        return {count:state.count+actions.count}
      case Tpyes.DECREMENT:
        return {count:state.count-actions.count}
      // case Tpyes.SAGA_ADD:
      //   return {count:state.count+1}
    }
    return state
}