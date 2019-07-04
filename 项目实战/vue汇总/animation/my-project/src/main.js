import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  'animate.css'
import Message from './components/Message'
// import * as obj from './a'
// console.log('a=',obj.default)
Vue.config.productionTip = false
// Vue.directive('color',(el,bindings,vnode)=>{
//   el.style.border=`1px solid ${bindings.expression}`
//   console.log('directive',el,bindings,vnode)
// })
// Vue.component('Bt','<div>11</div>')
let info = {a:1,b:2}

// router.beforeEach((to,from,next)=>{
//   console.log('beforeEach',to,from,next)
// })
// router.beforeResolve((to,from,next)=>{
//   console.log('beforeResolve',to,from,next)
// })
// router.afterEach((to, from) => {
//   console.log('afterEach',to,from)
// })
Vue.use(Message)
new Vue({
  router,
  store,
  info,
  // template:`<div>123</div>`,
  render: h => h(App)
}).$mount('#app')


// setTimeout(() => {
//   vm.$destroy()
// }, 5000);
// console.log('vm',)