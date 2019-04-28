import counter from './counter'
import subtraction from './subtraction'

// import { combineReducers } from 'redux'

// function combineReducers(reducers){
//   //redux 里面初次的时候 会dispatch state就会得到一个初始的值 也就是下面obj返回的值
//   //当我们调用方法的时候 触发dispath是直接传递参数 实际原来的state里面被合并后的obj包裹了一层
//   //所以这里state[key]这里要加[key]
//   return function (state={},actions){
//     let obj = {}
//     for(let key in reducers){
//       console.log(key,reducers[key])
//       obj[key] = reducers[key](state[key],actions)
//     }

//     return obj
//   }
// }

function combineReducers(reducers) {
  return function(state={},actions){
    let obj = {}
    for(let i in reducers){
      obj[i] = reducers[i](state[i],actions)
    }
    return obj
  }

}

//等待 合并reducer
export default combineReducers({counter,subtraction})
