import React, { Component } from 'react'
import Counter from './components/counter'
import TodoList from './components/todoList'
import TimeBase from './components/timeBase'
import SetState from './components/setstate'
import PropTypes from './components/propTypes'
import Box from './components/componentAxios/box'

import Form from './components/form'
import {Provider}  from 'react-redux'
import store from './store'

export class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <TimeBase/>
          <Counter number={123}/>
          <TodoList/>
          <SetState num={12}/>
          <PropTypes/>
          <Form />
          <Box/>
        </Provider>
      </div>
    )
  }
}

export default App
