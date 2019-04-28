import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Counter from './components/Counter'
import Todo from './components/Todo'



ReactDom.render(<div>
    <Counter />
    <Todo />
    </div>,window.root)