import * as types from "../action-types";
import {Counter1} from '../../types'
let initState:Counter1 = {
    number:0
}
interface actions {
    type:string
}
export default function(state:Counter1=initState,action:actions){
    console.log('counter1')
    switch(action.type){
        case types.INCREMENT1:
            return {number:state.number+1};
        case types.DECREMENT1:
            return {number:state.number-1};
        default:
            return state;
    } 
}