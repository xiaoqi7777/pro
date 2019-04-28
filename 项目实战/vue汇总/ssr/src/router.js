import Vue from 'vue';
import VueRouter from 'vue-router';

import Bar from './components/Bar.vue';
import Foo from './components/Foo.vue';

Vue.use(VueRouter);

export default()=>{
  let router = new Router({
    mode:'history',
    routes:[
      {path:'/',component:Bar},
      // import 需要插件处理
      // {path:'/foo',component:()=>import('./components/Foo.vue')},
    ]
  })
  return router
}