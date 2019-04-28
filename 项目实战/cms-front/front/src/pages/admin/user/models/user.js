import * as  serveices from '../services/user'

export default {

  namespace: 'user',

  state: {
    isCreate:true,//是否是添加
    editVisible:false,//是否编辑用户编辑窗口
    record:{},//当前的记录
    pageNum:1,//当前的页面
    total:0,//总记录数
    list:[],
    selectedRowKeys:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      //每当地址栏中的路径发生变化的时候 就会走次监听函数
      return history.listen(({pathname,query})=>{
        if(pathname == '/admin/user'){
          //当路径等于/admin/user的时候 ，就派发fetch动作, 获取数据
          // /admin/user?pageNum=1  query=={pageNum:1}
          dispatch({type:'fetch',payload:query})
        }
      })
    },
  },

  effects: {
    *fetch({ payload:{pageNum}}, { call, put }) {
      // 服务器返回{code:0,data:{list:[],total:100}}
      pageNum = isNaN(pageNum)?1:parseInt(pageNum)
      const {list,total} = yield call(serveices.fetch,pageNum);
      yield put({ type: 'save', payload:{list,total,pageNum}});
    },
    *create({ payload }, { call, put}){
      yield call(serveices.create,payload);
      yield put({type:'fetch',payload:{pageNum:1}})
      yield put({type:'save',payload:{editVisible:false}})
    },
    *update({ payload }, { call, put, select}){
      yield call(serveices.update,payload)
      // 怎么在 这儿获取获取state里面的值 这个state指的是合并后的state
      let pageNum = yield select(state => state.user.pageNum)
      yield put({type:'fetch',payload:{pageNum}})
      yield put({type:'save',payload:{editVisible:false}})
    },
    *del({ payload }, { call, put, select}){
      yield call(serveices.del,payload);
      yield put({type:'fetch',payload:{pageNum:1}})
      yield put({type:'save',payload:{editVisible:false}})
    },
    *delAll({ payload }, { call, put, select}){
      yield call(serveices.delAll,payload);
      yield put({type:'fetch',payload:{pageNum:1}})
      yield put({type:'save',payload:{editVisible:false}})
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
