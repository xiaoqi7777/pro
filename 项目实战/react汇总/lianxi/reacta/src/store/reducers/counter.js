
import * as Types from '../types'

export default function counter(state={number:0},action){
    switch (action.type) {
        case Types.INCREMENT:
            return {number:state.number+action.count}
        case Types.DECREMENT:
            return {number:state.number-action.count}
        default:
            break;
    }    
    return state
}