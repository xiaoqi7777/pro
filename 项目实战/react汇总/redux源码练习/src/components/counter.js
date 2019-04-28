import React, { Component } from "react";
import store from '../store'
export default class counter extends Component {
  state = {
    number: store.getters().counter.number
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
        number: store.getters().counter.number,
      });
    });
  }
  componentWillUnmount() {
    this.unsub()
  }
  render() {
    return (
      <>
        <p>{this.state.number}</p>
        <div onClick={() => this.del()}>点击减少</div>
        <div onClick={() => this.add()}>点击增加</div>
      </>
    );
  }
}
