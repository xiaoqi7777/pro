export default {
  namespaced: true, //启动 独立的命名空间
  state: {
    userName: 'userName'
  },
  getters: {

  },
  mutations: {
    // 第一个参数永远是state
    change_userName(state,payload) {
      // alert(1)
      state.userName = payload
      console.log(state,payload)
    }
  },
  actions: {
    change_userNameAction({commit},payload){
        setTimeout(()=>{
          commit('change_userName',payload)
          //在action中可以多次触发mutations
        },1000)
    }
  }
}