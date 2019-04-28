import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Counter from './components/Counter'
import Test from './components/test'

import Todo from './components/Todo'
import {Provider} from 'react-redux'
import store from './store'



ReactDom.render(
    <Provider store={store}>
    <div>
        <Counter />
        <Todo />
        <Test>xxxxxxxx</Test>
    </div>
    </Provider>
    ,window.root)