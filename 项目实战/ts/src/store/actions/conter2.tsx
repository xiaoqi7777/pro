import * as types from '../action-types'

interface types{
    type:string
}
export default {
    increment():types{
        return {type:types.INCREMENT2}
    },
    decrement():types{
        return {type:types.DECREMENT2}
    }
}