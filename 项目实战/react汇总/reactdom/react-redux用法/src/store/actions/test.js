import * as Types from '../action-types'
// action reducer 纯函数 输入一定 返回就一定
export default{
    addTest(val){
        return {type:Types.ADD_TEST,testAdd:val}
    }
}