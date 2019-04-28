import * as Types from '../action-types';

export default{
  addTodu(val){
    console.log('111111',val)
    return {type:Types.ADD_TODO,addTodu:val}
  }
}

