import * as  serveices from '../serveices/login'
import { message } from 'antd';

import {decode} from 'jsonwebtoken';
import {routerRedux} from 'dva/router'
// router导出 react-router react-router-redux
export default {

  namespace: 'login',

  state: {
    isLogin:true,//判断是登录还是注册
    user:null
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
    *signup({payload}, {call,put}) {
      console.log('payload',payload)
      yield call(serveices.signup,payload)
      yield put({type:'switchLoginStatus'})
    },
    *login({payload}, {call,put}) {
      let token = yield call(serveices.login,payload)
      let user = decode(token)//得到服务器信息
      if(user){
        yield put({type:'save',payload:{user}})//放置到仓库中
        localStorage.setItem('token',token);
        yield put(routerRedux.push('/admin/user'))
      }else{
        message.error('账号或者密码不正确')
      }
    },
    *loadUserFromLocal({payload}, {call,put}){
        let token = localStorage.getItem('token')
        if(token){
          const user = decode(token)
          yield put({type:'save',payload:{user}})
          yield put(routerRedux.push('/admin/user'))
        }else{
         yield put(routerRedux.push('/login'))
        }

    }
  },
  reducers: {
    switchLoginStatus(state,action){
      return { ...state,isLogin:!state.isLogin}
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },

  },

};
