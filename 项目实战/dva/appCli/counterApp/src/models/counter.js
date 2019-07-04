// cnpm i keymaster 键盘事件
import keymaster from 'keymaster';

let delay = (ms)=>{
 return new Promise((resolve,reject)=>{
    setTimeout(()=>{
    console.log('123',ms)
      resolve()
    },ms)
  })
}

export default {

  namespace: 'counter',

  state: {
    current:0,
    record:0
  },
// 当页面往仓库派发ation的时候 reducers 和 effects 都能收到
// reducers 和 effects 里的key值都是 action
  reducers: {
    add(state, action) {
      let current = state.current +1
      return { ...state, 
        current:current,
        record:current>state.record?current:state.record
      };
    },
    minus(state, action) {
      console.log('123=minus')
      let current = state.current - 1
      return { ...state, 
        current
      };
    },
  },
  
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *add({ payload }, { call, put }) {  // eslint-disable-line
      yield call(delay,1000);
      yield put({ type: 'minus' });
    },
  },

  subscriptions: {

    setup({ dispatch, history }) {  // eslint-disable-line
      keymaster('a',()=>{
        dispatch({type:'add'})
      })
    },
  },


};

