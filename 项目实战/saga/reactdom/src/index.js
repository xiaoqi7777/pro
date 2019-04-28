import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import List from './components/List';
import {Provider} from 'react-redux'
import store from './store'
ReactDOM.render(
  <Provider store={store}>
    <Counter />
    <List />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
