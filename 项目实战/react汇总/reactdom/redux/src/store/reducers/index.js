import counter from "./counter";
import todo from "./todo";
// combineReducers 是把两个状态合并成一个 并且把reducer也变成一个
import { combineReducers } from "redux";

export default combineReducers({
    counter,
    todo
});
