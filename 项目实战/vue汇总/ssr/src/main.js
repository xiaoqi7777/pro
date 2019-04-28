import Vue from 'vue';
import App from './App.vue'
import crateRouter from './router';
// 为了兼容服务器 要把这个方法改造成函数
export default function createApp(){
  let router = crateRouter()
  let app = new Vue({
    router,
    render:(h)=>h(App)
  })
  return {app,router}
}
