// import * as Types from '../action-types';

export default{
  add(val){
    return {type:'ADD',count:val}
  },
  del(val){
    return {type:'DEL',count:val}
  }
}


