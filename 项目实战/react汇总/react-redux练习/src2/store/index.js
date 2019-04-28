import { CreateStore } from "../redux";
import reducer from './reducer'

let store = CreateStore(reducer)
export default store
