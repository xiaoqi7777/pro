export default function createSagaMiddleware(){

  //发布订阅
  function createChannel(){
    let events = {};
    function subscribe(actionType,listener){
     console.log('subscribe',actionType,)
      events[actionType] = listener
    }
    function publish(action){

     let listener = events[action.type]
     console.log('123123123123',action)
      if(listener){
        // 默认只执行一次 所以要删除
        delete events[action]
        //  listener(action) 就是执行中间件的next(action)
    //  console.log('listener',listener)
        listener(action)
      }
    }
    return {subscribe,publish}
  }

  let channel = createChannel();
  function times(done,total){
    let count = 0;
    return function(){
      if(++count == total){
        done()
      }
    }
  }
  function sagaMiddleware(stroe) {
    function run(generator,finish) {
      // 执行生成器,得到迭代器
      let it =  typeof generator == 'function' ? generator():generator;
      function next(action){
        // value:effect => 将value改名为effect
        let {value:effect,done} = it.next(action);
        // console.log('默认执行一次,也就是执行take 发布一下而',effect,done)
        if(!done){
          if(typeof effect[Symbol.iterator] == 'function'){
              run(effect);
              next();
          }else if(effect.then){
            effect.then(next);
          }else{
            switch(effect.type){
                case 'take'://订阅某个动作类型
                    channel.subscribe(effect.actionType,next);
                    break;
                case 'put':
                    stroe.dispatch(effect.action)
                    next();
                    break;
                case 'fork':
                    // 接受到的是一个生成器 需要传给run处理
                    run(effect.task);
                    next();
                    break;
                case 'call':
                    effect.fn(...effect.args)
                    .then(next);
                    break;
                case 'all':
                    let final = times(next,effect.fns.length) 
                    effect.fns.forEach(fn=>run(fn,final));
                default:
                    break;
            }
          }
        }else{
          //全部完成后
          console.log('完成')
          finish && finish();
        }
      }
      next(); 
    }
    sagaMiddleware.run = run;
    return function (next) {
      return function (action) {// store.dispatch 就等于执行最里面的函数
        channel.publish(action)//派发action
        next(action)
      }
    }
  }

  return sagaMiddleware
}



/*

  react 中间件的结构
  //下面是一个没有功能的中间件
  function sagaMiddleware(stroe) {
    return function (next) {
      return function (action) {
        next(action)
      }
    }
  }
*/

// function *fn(){
//   yield s
// }
// console.log(fn())