function CreateStore(reducer) {
  let state;
  let getState = () => state;
  let listeners = [];
  let dispatch = (action)=>{
    console.log('---------componentWillMount')
    state = reducer(state,action)
    listeners.forEach(fn=>fn())
  }
  dispatch({type:'@INIT'})
  let subscribe = (fn)=>{
    console.log('=componentWillMount')
    listeners.push(fn)
    return ()=>{
      listeners = listeners.filter(l=>l!=fn)
    }
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}
export { CreateStore };
