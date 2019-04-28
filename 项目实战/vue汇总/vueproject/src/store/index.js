import Vue from 'vue';

import vuex from 'vuex';

import actions from './actions'
import mutations from './mutations'
import state from './state'
import getters from './getters'

import user from './modules/user'

Vue.use(vuex)
// 只要页面中注入了store 每个实例上都会存在一个属性 $store
export default new vuex.Store({
  strict:process.env.NODE_ENV != 'production',// 校验更改状态的合法性
  actions,
  mutations,
  state,
  getters,
  modules:{
    user
  }
})
// this.$store.state.lesson
// this.$store.state.user.userName