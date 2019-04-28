function createStore(reducer){
    let state;
    let getState = ()=>state;
    let listeners = [];
    let dispatch = (action)=>{
        state = reducer(state,action)
        listeners.forEach(fn=>fn())
    }
    let subscribe = (fn)=>{
        listeners.push(fn)
        return ()=>{
            listeners = listeners.filter(l=>l!=fn)
        }
    }
    return {
        getState,
        subscribe,
        dispatch
    }
}