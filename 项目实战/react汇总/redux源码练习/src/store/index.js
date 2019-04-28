import { CreateStore } from "../redux";
import reducer from './reducer'

let store = CreateStore(reducer)
console.log('11111111',store.getters())
console.log('11111111',store)
export default store
