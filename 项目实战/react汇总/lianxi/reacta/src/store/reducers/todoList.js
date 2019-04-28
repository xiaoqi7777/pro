import * as Types from '../types'

export default function a (state=[],action){
    switch(action.type){
        case Types.LIST:
            return [...state,action.list]
        default :
            return state
    }
    return state
}