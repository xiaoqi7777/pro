import * as Types from '../types'


export default {
    todo(n){
        return {type:Types.LIST,list:n}
    }
}