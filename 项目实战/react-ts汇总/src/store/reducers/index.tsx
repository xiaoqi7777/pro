import {Store} from '../../types/index'
import {Action} from '../actions/counter'
let initState:Store  = {
    number : 0
}
import * as types from '../action-types';

export default function(state:Store=initState,action:Action){
    switch(action.type){
        case types.INCREMENT:
            return {number:state.number+1}
        case types.DECREMENT:
            return {number:state.number-1}
        default:
            return state;
    }
}
