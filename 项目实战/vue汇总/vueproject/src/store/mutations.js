export default {
  showLoading(state){
    state.isShowLoading = true
  },
  hideLoading(state){
    state.isShowLoading = false
  },
  setUser(state,username){
    state.username = username;
  }
}