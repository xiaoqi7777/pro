import React from 'react';
import { connect } from 'dva';
import styles from './Counter.less'
function Counter(props) {
  return (
    <div className={styles.container}>
        <div className={styles.record}>
          最高分:{props.record}
        </div>
        <div className={styles.current}>
          当前分:{props.current}
        </div>
        <div className={styles.button}>
          <button onClick={()=>props.dispatch({type:'counter/add'})}>+</button>
        </div>
        
    </div>
  );
}


export default connect(
  state=>state.counter
)(Counter);
