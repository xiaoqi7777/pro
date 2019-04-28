import {createStore,applyMiddleware} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import createSagaMiddleware  from 'redux-saga'
import rootSaga from '../saga'
let sageMiddleware = createSagaMiddleware()
// sageMiddleware 是用来拦截对saga中间件请求的
let store = createStore(reducer,applyMiddleware(sageMiddleware));
sageMiddleware.run(rootSaga)
export default store