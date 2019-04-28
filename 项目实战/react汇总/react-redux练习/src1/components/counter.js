import React, { Component } from "react";

import {connect} from 'react-redux'
export default class Counter extends Component {
  state = {
    number: ''
  };
  add = () => {
    store.dispatch({ type: "ADD", count: 3 });
  };
  del = () => {
    store.dispatch({ type: "DEL", count: 1 });
  };
  componentWillMount() {
    this.unsub = store.subscribe(() => {
      this.setState({
        number: store.getState().counter.number,
      });
    });
  }
  componentWillUnmount() {
    this.unsub()
  }
  render() {
    return (
      <>
        {/* <p>{this.props.number}</p> */}
        <div onClick={() => this.del()}>点击减少</div>
        <div onClick={() => this.add()}>点击增加</div>
      </>
    );
  }
}
//connect 方法执行2次后 返回的是一个组件
//第二个参数是原来的组件 会把redux中的状态映射到这个组件上
// export default connect(mapStateToProps,mapDispatchToProps)(Counter)