import * as Types from '../types'

export default {
    add(n){
      console.log('n',n)
      return {type:Types.INCREMENT,count:n}
    },
    sagaAdd(n){
      return {type:Types.SAGA_ADD,count:n}
    },
    del(n){
      return {type:Types.DECREMENT,count:n}
    },
}