import React from 'react';
import dva,{connect} from './dva';
import {Router,Route} from './dva/router'
import {Link} from 'react-router-dom'
const app = dva();
const delay = ms => new Promise((resolve)=>{
  setTimeout(()=>{
    resolve()
  },ms)
})
app.model({
  namespace:'count',
  state:{number:0},
  reducers:{
    add(state){
      return {number:state.number+1}
    }
  },
  effects:{
    *asyncAdd({call,put},actions){
      yield call(delay,1000);
      console.log('jinali l ',actions)
      yield put({type:'count/add'})
    }
  }
});
const Count = connect(
  state => state.count
)(props=>( 
    <div>
      <button onClick={()=>props.history.goBack()}>返回</button>
         <p>{props.number}</p>
        <button onClick={()=>props.dispatch({type:'count/add'})}>+</button>
        <button onClick={()=>props.dispatch({type:'count/asyncAdd'})}>asyncAdd+</button>
    </div>
))
const Home = () =>(
  <div>
    <h3>Home</h3>
    <Link to='/count'>count</Link>
  </div>
) 

app.router(({history, app}) => (
  <Router history={history}> 
    <div>
      <Route exact path='/' component={Home} />
      <Route  path='/count' component={Count} />
    </div>
  </Router>
))

app.start('#root')