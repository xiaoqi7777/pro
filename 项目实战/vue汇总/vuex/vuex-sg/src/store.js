import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex);// use会调 install方法 

export default new Vuex.Store({
  modules:{ // 可以给状态划分模块
    a:{
      state:{
        count:200
      },
      modules:{
        b:{
          state:{
            count:3000
          }
        }
      }
    }
  },
  state: {
    count:100
  },
  getters: {
    newCount(state){
      return state.count + 100
    }
  },
  mutations: {
    change(state){
      state.count+=10
    }
  },
  actions: {
    change({commit}){
      setTimeout(()=>{
        commit('change')
      },1000)
    }
  }
})
