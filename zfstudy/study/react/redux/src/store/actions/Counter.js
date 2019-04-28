import * as Types from '../action-types';

export default{
  add(val){
    return {type:Types.INCREMENT,count:val}
  }
}


