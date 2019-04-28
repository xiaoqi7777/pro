import * as Types from '../action-types'

function counter(state = {number:0},action){
  console.log('con')

  switch(action.type){
    case Types.INCREMENT:
    return {number:state.number+action.count}
  }
  return state
}
export default counter

