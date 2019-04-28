import * as types from "../action-types";
import {Counter2} from '../../types'
let initState:Counter2 = {
    number:0
}
interface actions {
    type:string
}
export default function(state:Counter2=initState,action:actions){
    console.log('counter2')
    switch(action.type){
        case types.INCREMENT2:
            return {number:state.number+1}; 
        case types.DECREMENT2:
            return {number:state.number-1};
        default:
            return state;
    }
}