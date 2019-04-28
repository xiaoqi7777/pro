import * as Types from '../action-types'
 function Todu(state = [],action){
  console.log('action.addTodu')
  switch(action.type){
    case Types.ADD_TODO:
    return [...state,action.addTodu]
  }
  return state
}
export default Todu
