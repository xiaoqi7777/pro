import Counter from './Counter'
import Todu from './Todu'


// function com(reducers){
//   return function(state={},action){
//     let obj = {};
//     for(let key in reducers){
//       console.log('key-------',state)
//       obj[key] = reducers[key](state[key],action)
//     }
//     return obj
//   }
// }
// export default com({
//   Counter,
//   Todu:Todu
// })


import {combineReducers} from 'redux'
 export default combineReducers({
  Counter,
  Todu
 })

