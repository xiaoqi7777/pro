import {createStore} from '../redux'
// 1、redux原则就是一个项目只有一个store 只有一个状态(只有一个管理员)
import reducer from './reducers'
let store = createStore(reducer)
window.store = store

export default store