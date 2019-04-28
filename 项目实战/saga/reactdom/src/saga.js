
import {takeEvery,put,take,call,all } from 'redux-saga/effects'
import * as Types from './store/types'



/**
 * take 会阻塞  take 和 put 不能传递一样的类型 会无线循环
 */
// export default function * rootSaga(){
//   for(var i=0;i<3;i++){
//     console.log(`第${i}次`)
//     // take监听一次 会触发 subscribe  
//     // 默认rootSaga会执行一次  也就是take会被
//     // take 里面的type 要和 按键触发的 type 一样 才能触发 put
//     yield take(Types.SAGA_ADD)
//     // put 当点击的时候 才触发他
//     yield add()
//   }
//   console.log('结束了。。。')
// }

/**
 * takeEvery 不会阻塞 && call
 * takeEvery 第三个参数 会传递给 第二个参数(生成器add)
 * 第二个参数 生成器最后一个参数 默认接收到的是action
 */
const delay = ms =>new Promise((res,rej)=>{
  // setTimeout(res,ms)
  setTimeout(()=>{
      res('--',new Date())
  },ms);
})
// // 这是saga的唯一入口
export default function * rootSaga(){
  //拦截或者监听SAGA_ADD动作,然后执行对应的workerSaga
  yield takeEvery(Types.SAGA_ADD,add,123,1231);
}

export function * add(n,action) {
  console.log('n=>',n)
  console.log('action',action)
  console.log('add=>',arguments)
  //当yield一个promise的时候,程序不会立刻执行 等待时间 在执行
  // let rs =yield delay(1000);//产出了一个promise
  // console.log('rs',rs)
  // 一般异步用 call
  let date = yield call(delay,1000)
  //put相当于dispatch(action)
  yield put({type:Types.INCREMENT,count:2})
}

/**
 * all
 */

//  function* logger(){
//    console.log('加1.。')
//  }
//  function* loggerWatcher(){
//    yield takeEvery(Types.SAGA_ADD,logger)
//  }

//  function* add(){
//    yield put({type:Types.INCREMENT,count:1})
//  }
//  function* addWatcher(){
//    yield takeEvery(Types.SAGA_ADD,add)
//  }
//  // all 全部的意思 promise.all
// export default function * rootSaga(){
//   //拦截或者监听SAGA_ADD动作,然后执行对应的workerSaga
//   yield all([loggerWatcher(),addWatcher()]);
//   console.log('the end')
// }
