
// redux 状态管理 把数据集中存放

// 当前所有组件的状态
// 1、redux中不能直接操作状态
// 2、如果任意一个组件想要更新事件,需要派发一个动作
// 3、提供一个管理员reducer 来传递派发的动作 参数(当前的组件的状态，用户派发的动作)
// 4、每次更新状态用一个新的状态对象覆盖掉(事件旅行)
// 5、每个组件订阅这个状态，dispatch的时候就会自动更新


function createStore(reducer){
  let state; 
  let listeners = []  
  //把state对象克隆一份 , 外面修改的时候 就不会影响到里面的值了
  let getState = ()=> JSON.parse(JSON.stringify(state));
  let dispatch = (action)=>{
    state = reducer(state,action)
    listeners.forEach(fn=>fn())
  }
  let subscribe = (fn)=>{
    listeners.push(fn);
    return ()=>{
      //subscribe 有个返回值 用来取消监听的
      listeners = listeners.filter(l=>fn != l)
    }
  }
  dispatch({type:'@INIT'})
  return{
    getState,
    dispatch,
    subscribe
  } 
}

let initState = {
  title : {content:'你好',color:'red'},
  content:{content:'哈哈',color:'green'}
}

function reducer(state = initState,action){
  switch(action.type){
    case 'A1':
      return {...state,title:{...state.title,color:action.color}}
  }
  return state
}


let store = createStore(reducer)
store.subscribe(renderApp)
setTimeout(()=>{
  store.dispatch({type:'A1',color:'pink'})
},10)
function renderTitle(){
  let dom = document.querySelector('#title')
  dom.innerHTML = store.getState().title.content
  dom.style.background = store.getState().title.color
}

function renderContent(){
  let dom = document.querySelector('#content')
  dom.innerHTML = store.getState().content.content
  dom.style.background = store.getState().content.color

}
function renderApp(){
  renderTitle()
  renderContent()
}
renderApp()