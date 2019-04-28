import * as Types from '../types'

export default {
    add(n){
        return { type:Types.INCREMENT,count:n}
    },
    del(n){
        return { type:Types.DECREMENT,count:n}
    }
}