import Vue from 'vue'
import App from './App.vue'

import store from './store/index'
import router from './router'


Vue.config.productionTip = false


router.beforeEach(async (to,from,next)=>{
  let a =  await store.dispatch('validate')

  console.log('==================',a)

  let flag = to.matched.some(match=>{
    return match.meta && match.meta.needLogin
  })

  if(flag){ //需要登录
    let isLogin = localStorage.getItem('login')// ajax 看一下用户是否登录过
    if(isLogin){
      //如果用户已经登录 并且访问 的还是登录页面
      next();
    }else{
      next('/login');//没有登录 去登录页面 
    }
  }else{ //不需要登录
    next();
  }
  next()
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
