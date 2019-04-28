
import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './components/Counter'
import Todu from './components/Todu'

// react-redux 主要是把react和redux 进行连接的一个库
// 在父级需要提供一个store 这样在每个组件中就可以引入store了
import {Provider} from 'react-redux'
import store from './store'
console.log('=====',store.getState)
ReactDOM.render(<Provider store={store}>
    <>
    {/* <Counter/>
    <Todu/> */}
    </>
</Provider> ,window.root)
