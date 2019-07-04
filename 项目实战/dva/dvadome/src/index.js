import React,{useState,memo,useCallback,useMemo,useEffect} from 'react'
import dva,{connect} from 'dva'

// dva 其实就是一个函数
const app = dva();

const delay = ms => new Promise(function(resolve){
  setTimeout(()=>{
    resolve()
  },ms)
})
const get = (url)=>{
  let rs = fetch(url).then(res=>res.json())
  return rs
}

app.model({
  //里面的是 子状态
  namespace:'count',
  state:{number:0},
  reducers:{
    //相当于action type 参数是老状态 返回值是新状态
    add(state,{payload}){return {number:state.number + payload}},
    minus(state,{payload}){return {number:state.number - payload}}
  },
  effects:{
    //effect 里面放的是generator
    // 第一个参数里action动作对象 effects副作用 reudx-saga/effects
    *addAmount(action,{put,call}){
      // yield call(delay,1000);
      let rs =  yield call(get,'http://localhost:3001/amount');
      yield put({type:'add',payload:rs.data})
    }
  }
});

// const App = connect(
//   state=>state.count
// )((props)=>(
//   <div>
//       <h2>{props.number}</h2>
//       <button onClick={()=>props.dispatch({type:'count/addAmount'})}>+</button>
//       <button onClick={()=>props.dispatch({type:'count/minusAmount'})}>-</button>
//   </div>
// ))

function useNumber(){
  let [number,setNumber] = useState(0)
  useEffect(() => {
    setInterval(()=>{
      setNumber(number=>number+1)
    },1000)
  }, [])
  return  [number,setNumber]
}

function Counter1(){
  let  [number,setNumber] = useNumber()
  return (
      <div>
        <button onClick={()=>setNumber(number+1)}>{number}</button>
      </div>
      )
}
function Counter2(){
  let  [number,setNumber] = useNumber()
  return( 
      <div>
        <button  onClick={()=>setNumber(number+1)}>{number}</button>
      </div>
  )
}
const App = ()=>(<>
  <Counter1/>
  <Counter2/>
</>)

app.router(()=><App />);
app.start('#root')











