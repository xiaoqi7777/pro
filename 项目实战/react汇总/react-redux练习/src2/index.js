import React from "react";
import ReactDom from "react-dom";
import Counter from "./components/counter";

/**   
 * react-redux 在父级提供store 这样在每个组件中就不用引入store
 * 提供了 connnect和Provider方法
 */
import { Provider } from "react-redux";
import store from "./store";
ReactDom.render(
  <Provider store={store}>
  <>
    <Counter />
  </>
  </Provider>,
  window.root
);
