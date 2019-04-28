
export function  take(actionType){
    return {
      type:'take',
      actionType
    }
  }
export function  put(action){
    return {
      type:'put',
      action
    }
  }
export function fork(task){
  return {
    type:'fork',
    task
  }
}

/**
 * 1、不能阻塞当前的generator函数
 *  开启一个新的线程 就相当于单独重新run
 * fork   
 */
export function* takeEvery(actionType,task){
  yield fork(function *(){
    while(true){
      yield take(actionType)
      yield task();
    }
  })
}

export function call(fn,...args){
  return{
    type:'call',
    fn,
    args
  }
}

export function all(fns){
  return {
    type:'all',
    fns
  }
}