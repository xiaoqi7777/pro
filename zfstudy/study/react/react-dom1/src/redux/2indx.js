


function createStore(reducer){
  let state;
  let listeners = []
  let getState = ()=>state
  let dispatch = (action)=>{
    state   =  reducer(state,action)
    listeners.forEach(fn=>fn())
  }
  dispatch({})
  let subscribe = (fn)=>{
    listeners.push(fn)
    return ()=>{
      listeners = listeners.filter(l => fn !== l)
    }
  }
  return {
    dispatch,
    getState,
    subscribe
  }
}


let initState = {
  title:{connent:'组件A',color:'red'},
  content:{connent:'组件B',color:'blue'}
}

function reducer(state=initState,action){
  switch(action.type){
    case 'cont':
    return {...state,title:{...state.title,color:action.color}}
    case 'content':
    return {...state,title:{...state.title,connent:action.connent}}
  
  }
  return state
}

let store = createStore(reducer)

store.subscribe(renderApp)
let fn1 = store.subscribe(()=>console.log('123--------'))

setTimeout(()=>{
  store.dispatch({type:'cont',color:'pink'})
},1000)

setTimeout(()=>{
  fn1()
  store.dispatch({type:'content',connent:'pink'})
},3000)


function renderContent() {
  let title = document.querySelector('#title')
  title.innerHTML  =  store.getState().title.connent
  title.style.background = store.getState().title.color
}
function renderTitle(){
  let title = document.querySelector('#content')
  title.innerHTML  =  store.getState().content.connent
}

function renderApp(){
  renderContent()
  renderTitle()
}
renderApp()

/*
1、创建一个仓库
    仓库里面有:订阅 派发 获取状态
2、操作数据--> 操作仓库里的派发 ，派发通知管理员(reducer,将当前的state和action传递给他),
              reducer在进行处理,返回结果赋值给state
3、订阅主要是 处理 状态更新后 重新渲染 将收集的函数 集中起来
4、dispatch之后 要对执行 订阅的函数


*/