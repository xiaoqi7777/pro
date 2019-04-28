import React from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider,connect} from 'react-redux';
import ReactDom from 'react-dom'
// import {takeEvery} from 'redux-saga/effects'
import * as effects from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import { createHashHistory } from 'history'
// 普通导出 引入的时候需要结构
export {connect}
// 默认导出 引入直接用
export default function(){
  const _app={
    _store:null,//放所有的仓库
    _models:[],//这里面放着所有的模型
    model,//方法
    _route:null,//所有的路由配置
    router,//方法
    start,//方法
  }
  function model(m){
    //每次调用model 就将他存放到总的模型库里面
    _app._models.push(m)
  }
  function router(routerConfig){
    _app._router = routerConfig
  }
  const history = createHashHistory()
  function start(root){
    const App = _app._router({history,app:_app});
    // 每一个模型 都有namespace 都是状态树中的子属性, 都有一个子的reducer
    // combineReducers 合并的时候传入一个对象 key是属性名 值是处理函数

    let reducers = {};
    for(let m of _app._models){
      // key 是namespace的值 value是一个reducer函数
      reducers[m.namespace] = function(state=m.state,action){
        // action => 一般都是 'count/add'等等
        // 截取action / 后面名字  查看m.namespace 当前的reducers下是否有该名字(方法)
        let actionType = action.type;
        let [namespace,type] = actionType.split('/');
        // 当action里命名空间  和 当前方法命名空间 相同 才需要处理
        if(namespace == m.namespace){
          let reducer = m.reducers[type];
          // 此时说明有该方法 就执行
          if(reducer){
            return reducer(state,action)
          }
        }
          return state;
      }
    }
    let reducer = combineReducers(reducers);
    let sagaMiddleware = createSagaMiddleware()
    function* rootSaga(){
      for(let m of _app._models){
        for(let key in (m.effects)||{}){
          //监听每个动作发生,当动作发生的时候 执行对应的generator 任务
          // takeEvery(action,fn)
          // 第三个参数 effects 传递给 *asyncAdd()的第二个参数
          yield effects.takeEvery(m.namespace+'/'+key,m.effects[key],effects)
        }
      }
    }
    let store = createStore(reducer,applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga)
    ReactDom.render(
      <Provider store={store}>
        {App}
      </Provider>
      ,document.querySelector(root))
  }

  return _app
}