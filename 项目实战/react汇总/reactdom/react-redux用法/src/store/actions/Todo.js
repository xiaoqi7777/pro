import * as Types from '../action-types'
// action reducer 纯函数 输入一定 返回就一定
export default{
    addTodo(val){
        return {type:Types.ADD_TODO,todo:val}
    }
}