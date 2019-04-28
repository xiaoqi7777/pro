import createStore from '../redux'
// import {reducer} from './reducers/Todu'
import reducer from './reducers'

console.log('reducer',reducer)

let store = createStore(reducer)

window.store = store

export default store