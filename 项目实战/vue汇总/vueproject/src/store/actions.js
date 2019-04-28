import {login,validate} from '../api/user'
import {setLocal} from '../libs/local'
export default {
  async toLogin({commit},username){
    let rs = await login(username);
    if(rs.code === 0){
      //成功登录
      commit('setUser',rs.username)
      //将token保存到client 每次请求带上, 服务端校验token 如果token不正确 或者过期 没登录
      setLocal('token',rs.token)
    }else{
      return Promise.reject(rs.data)
    }
  },
  async validate({commit}){
    let rs = await validate();
    if(rs.code === 0){
      commit('setUser',rs.username)
      setLocal('token',rs.token)
    }
    return rs.code === 0;//返回用户是否失效
  }
}