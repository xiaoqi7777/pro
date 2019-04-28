import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '_v/Home.vue'
import Profile from '_v/Profile.vue'
import User from '_v/User.vue'
// 默认加载首页 其他的组件 在点击时懒加载
// 可能会有白屏

Vue.use(VueRouter);

export default new VueRouter({
  mode:'hash', //默认会出现一个#
  routes:[
    {
      path:'/home',
      name:'home',
      component:{
        default:Home,
        name:Profile,
        version:User
      }
    },
    {
      path:'/login',
      name:'login',
      // import返回的是一个promise
      component:()=>import('_v/Login.vue')
    },
    {
      path:'/profile',
      name:'profile',
      component:()=>import('_v/Profile.vue'),
    },
    {
      path:'/user',
      name:'user',
      component:()=>import('_v/User.vue'),
      meta:{ needLogin:true },//路由元信息
      children:[
        {
          path:'',
          component:()=>import('_v/userAdd.vue'),
        },
        {
          // 儿子路径默认不能j加/ 
          path:'add',
          name:'userAdd',
          component:()=>import('_v/userAdd.vue'),
        }
      ]
    },
  ]
  
})